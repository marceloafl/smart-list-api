import { Request, Response } from "express";
import * as itemService from "../services/itemService";

export const getAllItems = async (req: Request, res: Response) => {
  const items = await itemService.getAllItems();
  res.json(items);
};
