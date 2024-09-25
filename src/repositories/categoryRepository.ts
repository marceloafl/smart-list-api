import CategoryModel from "../models/categoryModel";

class CategoryRepository {
  async findAll() {
    return await CategoryModel.find();
  }

  async findByName(name: string) {
    return await CategoryModel.findOne({ name });
  }

  async create(categoryData: { name: string }) {
    const newCategory = new CategoryModel(categoryData);
    return await newCategory.save();
  }

  async delete(id: string) {
    const result = await CategoryModel.findByIdAndDelete(id);
    return result;
  }

  async findOrCreateUncategorized() {
    let category = await CategoryModel.findOne({ name: "No category" });
    if (!category) {
      category = new CategoryModel({ name: "No category" });
      await category.save();
    }
    return category;
  }
}

export default new CategoryRepository();
