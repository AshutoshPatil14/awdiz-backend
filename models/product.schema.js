import { Schema } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  stock: { type: Number, required: true },
  imgUrl: { type: URL, required: true },
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },  
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("products", productSchema);

export default Product;
