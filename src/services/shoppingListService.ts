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
}

export default new ShoppingListService();
