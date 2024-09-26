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

export const deleteShoppingList = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await shoppingListService.deleteShoppingList(id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Shopping list not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting shopping list" });
  }
};

export const updateShoppingList = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    itemsToAdd,
    itemsToRemove,
  }: {
    itemsToAdd?: ShoppingListItem[];
    itemsToRemove?: mongoose.Types.ObjectId[];
  } = req.body;

  try {
    const shoppingList = await shoppingListService.findById(id);
    if (!shoppingList) {
      return res.status(404).json({ error: "Shopping list not found" });
    }

    if (itemsToAdd) {
      const existingItemIds = shoppingList.items.map((item) =>
        item.itemId.toString()
      );

      const duplicateItem = itemsToAdd.find((item) =>
        existingItemIds.includes(item.itemId.toString())
      );
      if (duplicateItem) {
        return res.status(400).json({
          error: `Item with ID ${duplicateItem.itemId} already exists in the shopping list.`,
        });
      }

      const itemsWithDetails = await Promise.all(
        itemsToAdd.map(async (item) => {
          const itemDetails = await itemService.findOneById(item.itemId);
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

      shoppingList.items.push(...itemsWithDetails);
    }

    if (itemsToRemove) {
      shoppingList.items = shoppingList.items.filter((item) => {
        return !itemsToRemove.some((idToRemove) => {
          const objectIdToRemove = new mongoose.Types.ObjectId(idToRemove);
          return objectIdToRemove.equals(item.itemId);
        });
      });
    }

    await shoppingList.save();

    res.status(200).json(shoppingList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating shopping list" });
  }
};

export const clearShoppingList = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updatedShoppingList = await shoppingListService.clearShoppingList(id);
    res.status(200).json(updatedShoppingList);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Error clearing shopping list" });
    }
  }
};
