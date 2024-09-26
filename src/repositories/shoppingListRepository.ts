import mongoose from "mongoose";
import ShoppingListModel from "../models/shoppingListModel";

class ShoppingListRepository {
  async findAll() {
    return await ShoppingListModel.find();
  }

  async create(shoppingListData: {
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
    const newShoppingList = new ShoppingListModel(shoppingListData);
    return await newShoppingList.save();
  }
}

export default new ShoppingListRepository();
