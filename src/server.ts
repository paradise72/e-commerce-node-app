import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoute";
import {connectDB} from "./config/database";
dotenv.config();
connectDB();
const app = express();

const port = process.env.PORT;
// Allow Express to read JSON
app.use(express.json());

// Product routes
app.use("/products", productRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});