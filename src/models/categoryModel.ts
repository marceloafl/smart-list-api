import mongoose, { Document, Schema } from "mongoose";

interface Category extends Document {
  name: string;
  createdAt: Date;
}

const categorySchema = new Schema<Category>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CategoryModel = mongoose.model<Category>("Category", categorySchema);
export default CategoryModel;
