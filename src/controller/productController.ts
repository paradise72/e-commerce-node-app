import { Request, Response } from "express";
import { Product } from "../model/productModel";

// Temporary database using an array
let products: Product[] = [
    {
        id: 1,
        name: "Laptop",
        price: 850000,
        category: "Electronics"
    },
    {
        id: 2,
        name: "Keyboard",
        price: 25000,
        category: "Accessories"
    }
];

// GET all products
export const getProducts = (req: Request, res: Response) => {
    res.json(products);
};

// GET one product
export const getProductById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
};

// CREATE product
export const createProduct = (req: Request, res: Response) => {
    const { name, price, category } = req.body;

    const newProduct: Product = {
        id: products.length + 1,
        name,
        price,
        category
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
};

// UPDATE product
export const updateProduct = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const { name, price, category } = req.body;

    product.name = name;
    product.price = price;
    product.category = category;

    res.json(product);
};

// DELETE product
export const deleteProduct = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const productIndex = products.findIndex(
        product => product.id === id
    );

    if (productIndex === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const deletedProduct = products.splice(productIndex, 1);

    res.json({
        message: "Product deleted successfully",
        product: deletedProduct[0]
    });
};