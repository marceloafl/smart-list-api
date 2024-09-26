import mongoose from "mongoose";
import shoppingListRepository from "../repositories/shoppingListRepository";

class ShoppingListService {
  async getAllShoppingList() {
    return await shoppingListRepository.findAll();
  }

  async createShoppingList(shoppingListData: {
    userId: mongoose.Types.ObjectId;
    title: string;
    items: {
      itemId: mongoose.Types.ObjectId;
      name: string;
      quantity: number;
      checked?: boolean;
      comment?: string;
      price: number;
    }[];
  }) {
    return await shoppingListRepository.create(shoppingListData);
  }

  async deleteShoppingList(id: string) {
    const result = await shoppingListRepository.delete(id);
    return result;
  }

  async findById(id: string) {
    return await shoppingListRepository.findById(id);
  }

  async clearShoppingList(id: string) {
    const shoppingList = await this.findById(id);
    if (!shoppingList) {
      throw new Error("Shopping list not found");
    }
    shoppingList.items = [];
    await shoppingList.save();
    return shoppingList;
  }
}

export default new ShoppingListService();
