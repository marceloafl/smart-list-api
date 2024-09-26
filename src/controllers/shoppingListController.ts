import { Request, Response } from "express";
import shoppingListService from "../services/shoppingListService";
import itemService from "../services/itemService";
import { ShoppingListItem } from "../models/shoppingListModel";
import mongoose from "mongoose";
import { Item } from "../models/itemModel";

export const getAllShoppingList = async (req: Request, res: Response) => {
  try {
    const shoppingLists = await shoppingListService.getAllShoppingList();
    res.json(shoppingLists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching shopping lists." });
  }
};

export const createShoppingList = async (req: Request, res: Response) => {
  const {
    userId,
    title,
    items,
  }: {
    userId: mongoose.Types.ObjectId;
    title: string;
    items: ShoppingListItem[];
  } = req.body;

  try {
    const itemIds = items.map((item) => item.itemId);
    const existingItems = (await itemService.findByIds(itemIds)) as Item[];

    if (existingItems.length !== itemIds.length) {
      return res.status(400).json({ error: "One or more items do not exist." });
    }

    const itemsWithDetails = await Promise.all(
      items.map(async (item) => {
        const itemDetails = existingItems.find((existingItem) => {
          return (
            existingItem._id instanceof mongoose.Types.ObjectId &&
            existingItem._id.equals(item.itemId)
          );
        });
        if (!itemDetails) {
          throw new Error(`Item with ID ${item.itemId} does not exist.`);
        }
        return {
          itemId: item.itemId,
          name: itemDetails.name,
          quantity: item.quantity,
          checked: item.checked || false,
          comment: item.comment,
          price: item.price,
        };
      })
    );

    const newShoppingList = await shoppingListService.createShoppingList({
      userId,
      title,
      items: itemsWithDetails,
    });
    res.status(201).json(newShoppingList);
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Error creating the shopping list" });
    }
  }
};
