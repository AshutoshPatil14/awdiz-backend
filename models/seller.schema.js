import mongoose, { Schema } from "mongoose";

const sellerSchema = new Schema({
  role: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Seller = mongoose.model("sellers", sellerSchema);

export default Seller;
