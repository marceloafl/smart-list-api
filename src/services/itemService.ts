import itemRepository from "../repositories/itemRepository";

class ItemService {
  async searchItems(query: string) {
    return await itemRepository.searchByName(query);
  }

  async createItem(itemData: { name: string; categoryId: string }) {
    const existingCategory = await itemRepository.findByName(itemData.name);
    if (existingCategory) {
      throw new Error("Categoria já existe");
    }
    return await itemRepository.create(itemData);
  }

  async deleteItem(id: string) {
    const result = await itemRepository.delete(id);
    return result;
  }
}

export default new ItemService();
