import express from "express";
import productRoutes from "./routes/productRoute";

const app = express();

const port = 3000;

// Allow Express to read JSON
app.use(express.json());

// Product routes
app.use("/products", productRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});