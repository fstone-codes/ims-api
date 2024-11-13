import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

const { DB_PORT, CORS_ORIGIN } = process.env;

app.use(cors({ origin: CORS_ORIGIN }));
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
app.listen(DB_PORT, () => {
  console.log(`Server is listening at http://localhost:${DB_PORT}`);
  console.log("Press CTRL + C or CMD + C to stop server");
});
