import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/categoryController";

const router = express.Router();

router.get("/categories", getAllCategories);
router.post("/categories", createCategory);
router.delete("/categories/:id", deleteCategory);

export default router;
