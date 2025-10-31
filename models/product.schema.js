import { Schema } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("products", productSchema);

export default Product;
