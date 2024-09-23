import * as categoryRepository from "../repositories/categoryRepository";

export const getAllCategories = async () => {
  return categoryRepository.getAllCategories();
};
