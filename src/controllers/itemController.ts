import { Request, Response } from "express";
import itemService from "../services/itemService";

export const getAllItems = async (req: Request, res: Response) => {
  const query = req.query.q as string;

  try {
    const items = await itemService.searchItems(query);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching items." });
  }
};

export const createItem = async (req: Request, res: Response) => {
  const { name, categoryId } = req.body;

  try {
    const newItem = await itemService.createItem({ name, categoryId });
    res.status(201).json(newItem);
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error && err.message === "Item already exists") {
      res.status(409).json({ error: "Item already exists" });
    } else {
      res.status(500).json({ error: "Error creating item" });
    }
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await itemService.deleteItem(id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting item" });
  }
};
