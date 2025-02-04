import express from "express";
import {
  clearShoppingList,
  createShoppingList,
  deleteShoppingList,
  getAllShoppingList,
  updateItemCheckedStatus,
  updateShoppingList,
} from "../controllers/shoppingListController";

const router = express.Router();

router.get("/shopping-lists", getAllShoppingList);
router.post("/shopping-lists", createShoppingList);
router.delete("/shopping-lists/:id", deleteShoppingList);
router.put("/shopping-lists/:id", updateShoppingList);
router.put("/shopping-lists/:id/clear-list", clearShoppingList);
router.put("/shopping-lists/:id/check-status", updateItemCheckedStatus);

export default router;
