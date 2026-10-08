import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import {
    getProduct,
    getProductById,
    newProduct,
    updateProduct,
    deleteProduct
} from "../controller/productController";

import { upload } from "../middleware/uploadMiddleware";

const productRoute = Router();

 

// GET all products

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
productRoute.get("/products", getProduct);

// GET one product

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The requested product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
productRoute.get("/products/:id", getProductById);

productRoute.use(authenticate); // Apply authentication middleware to all routes

// CREATE product


/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Creates a new product with an image upload.
 *     tags:
 *       - Products
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - category
 *               - price
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: Wireless Mouse
 *
 *               description:
 *                 type: string
 *                 example: 2.4GHz ergonomic wireless mouse
 *
 *               category:
 *                 type: string
 *                 example: Electronics
 *
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 25.50
 *
 *               image:
 *                 type: string
 *                 format: binary
 *
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *
 *       400:
 *         description: Missing product information or image
 *
 *       401:
 *         description: Authentication required
 *
 *       500:
 *         description: Server error
 */
productRoute.post("/products", upload.single("image"), newProduct);

// UPDATE product

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductUpdate'
 *     responses:
 *       200:
 *         description: Product updated
 *       401:
 *         description: Missing or invalid token
 *       404:
 *         description: Product not found
 */
productRoute.put("/products/:id", updateProduct);

// DELETE product

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 *       401:
 *         description: Missing or invalid token
 *       404:
 *         description: Product not found
 */
productRoute.delete("/products/:id", deleteProduct);

export default productRoute;