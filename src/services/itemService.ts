import * as itemRepository from "../repositories/itemRepository";

export const getAllItems = async () => {
  return itemRepository.getAllItems();
};
