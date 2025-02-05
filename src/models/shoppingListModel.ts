import mongoose, { Document, Schema } from "mongoose";

interface Participant {
  userId: string;
  role: string;
}

const participantSchema = new Schema<Participant>({
  userId: { type: String, required: true },
  role: { type: String, required: true },
});

export interface ShoppingListItem {
  itemId: string;
  name: string;
  quantity: number;
  checked: boolean;
  comment?: string;
  price: number;
}

const shoppingListItemSchema = new Schema<ShoppingListItem>({
  itemId: { type: String, required: true, ref: "Item" },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  checked: { type: Boolean, default: false },
  comment: { type: String, default: "" },
  price: { type: Number, required: true, min: 0 },
});

interface ShoppingList extends Document {
  userId: string;
  title: string;
  items: ShoppingListItem[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  participants: Participant[];
  sourceListId?: string;
  isSecondary: boolean;
}

const shoppingListSchema = new Schema<ShoppingList>({
  userId: { type: String, required: true, ref: "User" },
  title: { type: String, required: true },
  items: { type: [shoppingListItemSchema], default: [] },
  totalPrice: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  participants: { type: [participantSchema], default: [] },
  sourceListId: { type: Schema.Types.ObjectId, ref: "ShoppingList" },
  isSecondary: { type: Boolean, default: false },
});

shoppingListSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  this.totalPrice = this.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  next();
});

const ShoppingListModel = mongoose.model<ShoppingList>(
  "ShoppingList",
  shoppingListSchema
);

export default ShoppingListModel;
