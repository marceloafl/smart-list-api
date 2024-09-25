import { Request, Response } from "express";
import categoryService from "../services/categoryService";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar categorias" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const newCategory = await categoryService.createCategory({ name });
    res.status(201).json(newCategory);
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error && err.message === "Category already exists") {
      res.status(409).json({ error: "Category already exists" });
    } else {
      res.status(500).json({ error: "Error creating category" });
    }
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await categoryService.deleteCategory(id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting category" });
  }
};
