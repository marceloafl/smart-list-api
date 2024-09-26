import express from "express";
import {
  clearShoppingList,
  createShoppingList,
  deleteShoppingList,
  getAllShoppingList,
  updateShoppingList,
} from "../controllers/shoppingListController";

const router = express.Router();

router.get("/shopping-lists", getAllShoppingList);
router.post("/shopping-lists", createShoppingList);
router.delete("/shopping-lists/:id", deleteShoppingList);
router.put("/shopping-lists/:id", updateShoppingList);
router.patch("/shopping-lists/:id", clearShoppingList);

export default router;
