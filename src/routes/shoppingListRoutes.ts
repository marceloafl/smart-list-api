import express from "express";
import { getAllShoppingList } from "../controllers/shoppingListController";

const router = express.Router();

router.get("/shopping-list", getAllShoppingList);

export default router;
