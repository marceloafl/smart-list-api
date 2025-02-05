import ItemModel from "../models/itemModel";

class ItemRepository {
  async searchByName(query: string) {
    return await ItemModel.find({
      $text: { $search: query },
    })
      .limit(10)
      .populate("categoryId");
  }

  async findByName(name: string) {
    return await ItemModel.findOne({ name });
  }

  async findByIds(ids: string[]) {
    return await ItemModel.find({ _id: { $in: ids } });
  }

  async findOneById(id: string) {
    return await ItemModel.findById(id);
  }

  async create(itemData: { name: string; categoryId: string }) {
    const newItem = new ItemModel(itemData);
    return await newItem.save();
  }

  async delete(id: string) {
    const result = await ItemModel.findByIdAndDelete(id);
    return result;
  }

  async updateCategoryForItems(categoryId: string, newCategoryId: string) {
    return await ItemModel.updateMany(
      { categoryId },
      { categoryId: newCategoryId }
    );
  }
}

export default new ItemRepository();
