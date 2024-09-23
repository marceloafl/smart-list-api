import express from "express";
import { getAllItems } from "../controllers/itemController";

const router = express.Router();

router.get("/items", getAllItems);

export default router;
