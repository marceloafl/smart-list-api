import ShoppingListModel from "../models/shoppingListModel";

class ShoppingListRepository {
  async findAll() {
    return await ShoppingListModel.find();
  }

  async create(shoppingListData: {
    userId: string;
    title: string;
    items: {
      itemId: string;
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

  async delete(id: string) {
    return await ShoppingListModel.findByIdAndDelete(id);
  }

  async findById(id: string) {
    return await ShoppingListModel.findById(id);
  }
}

export default new ShoppingListRepository();
