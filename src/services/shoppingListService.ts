import * as shoppingListRepository from "../repositories/shoppingListRepository";

export const getAllShoppingLists = async () => {
  return shoppingListRepository.getAllShoppingLists();
};
