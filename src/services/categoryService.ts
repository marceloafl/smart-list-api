import mongoose from "mongoose";
import categoryRepository from "../repositories/categoryRepository";
import itemRepository from "../repositories/itemRepository";

class CategoryService {
  async getAllCategories() {
    return await categoryRepository.findAll();
  }

  async createCategory(categoryData: { name: string }) {
    const existingCategory = await categoryRepository.findByName(
      categoryData.name
    );
    if (existingCategory) {
      throw new Error("Categoria já existe");
    }
    return await categoryRepository.create(categoryData);
  }

  async deleteCategory(id: string) {
    const uncategorized = await categoryRepository.findOrCreateUncategorized();
    await itemRepository.updateCategoryForItems(
      id,
      uncategorized._id as mongoose.Types.ObjectId
    );

    const result = await categoryRepository.delete(id);
    return result;
  }
}

export default new CategoryService();
