import express from "express";
import {
  createShoppingList,
  getAllShoppingList,
} from "../controllers/shoppingListController";

const router = express.Router();

router.get("/shopping-lists", getAllShoppingList);
router.post("/shopping-lists", createShoppingList);

export default router;
