import express from "express";
import {
  createShoppingList,
  deleteShoppingList,
  getAllShoppingList,
} from "../controllers/shoppingListController";

const router = express.Router();

router.get("/shopping-lists", getAllShoppingList);
router.post("/shopping-lists", createShoppingList);
router.delete("/shopping-lists/:id", deleteShoppingList);

export default router;
