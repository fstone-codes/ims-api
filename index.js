import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        allowedHeaders: "Content-Type, Authorization",
    })
);

app.use(express.json());

// All warehouse routes
import warehouseRoutes from "./routes/warehouse-routes.js";
app.use("/api/warehouses", warehouseRoutes);

// All inventory routes
import inventoryRoutes from "./routes/inventory-routes.js";
app.use("/api/inventories", inventoryRoutes);

app.get("/", (req, res) => {
    res.send("👋 Hello from server");
});

// Server setup
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
