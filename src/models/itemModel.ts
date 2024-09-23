import mongoose, { Document, Schema } from "mongoose";

interface Item extends Document {
  name: string;
  categoryId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const itemSchema = new Schema<Item>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ItemModel = mongoose.model<Item>("Item", itemSchema);
export default ItemModel;
