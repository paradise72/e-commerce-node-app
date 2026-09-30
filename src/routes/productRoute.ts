import { Router } from "express";

import {
    getProduct,
    getProductById,
    newProduct,
    updateProduct,
    deleteProduct
} from "../controller/productController";

const router = Router();

// GET all products
router.get("/", getProduct);

// GET one product
router.get("/:id", getProductById);

// CREATE product
router.post("/", newProduct);

// UPDATE product
router.put("/:id", updateProduct);

// DELETE product
router.delete("/:id", deleteProduct);

export default router;