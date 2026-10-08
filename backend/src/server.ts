import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { Spec } from "./swagger";

import productRoutes from "./routes/productRoute";
import route from "./routes/authRouter";
import emailRoutes from "./routes/emailRoute";
import  brevoRouter from "./routes/brevoRoute";

import { connectDB } from "./config/database";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect MongoDB
connectDB();

// Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(Spec)
);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "E-commerce API is running successfully!",
  });
});
//Brevo routes
app.use("/api/brevo", brevoRouter);

// Auth routes
app.use("/api/auth", route);
    
// Email routes
app.use("/api/email", emailRoutes);



// Product routes
app.use("/api", productRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/api-docs`);
});