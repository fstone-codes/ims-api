import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

const { PORT, BACKEND_URL, CORS_ORIGIN } = process.env;

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// All warehouse routes
import warehouseRoutes from "./routes/warehouse-routes.js";
app.use("/warehouses", warehouseRoutes);

// All inventory routes
import inventoryRoutes from "./routes/inventory-routes.js";
app.use("/inventory", inventoryRoutes);

app.get("/", (req, res) => {
    res.send("👋 Hello from server");
  });

// Server setup
app.listen(PORT, () => {
    console.log(`Server is listening at ${BACKEND_URL}:${PORT}`);
})