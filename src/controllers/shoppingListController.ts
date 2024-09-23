import { Request, Response } from "express";
import * as shoppingListService from "../services/shoppingListService";

export const getAllShoppingList = async (req: Request, res: Response) => {
  const items = await shoppingListService.getAllShoppingLists();
  res.json(items);
};
