import express from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
} from "../controllers/itemController";

const router = express.Router();

router.get("/items", getAllItems);
router.post("/items", createItem);
router.delete("/items/:id", deleteItem);

export default router;
