import Product from "../models/product.schema.js";


export const addProduct = async (req, res) => {

    const { name, price, category, imgUrl, stock } = req.body || {};
    if (!name || !price || !category || !imgUrl || !stock) {
        return res.status(400).json({ message: "Please fill the missing fields", success: false });
    }

    const product = new Product({
        name,
        price,
        category,
        imgUrl,
        stock,
        seller: req.user._id,
    });

    await product.save();

    res.status(201).json({ message: "Product added successfully", success: true });
};

