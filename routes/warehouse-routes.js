import express from "express";
import * as warehouseController from "../controllers/warehouse-controller.js";

const router = express.Router();

// Route "/api/warehouses/"
router.route("/").get(warehouseController.index);

// Route for "/warehouses/:id"
router.route("/:id").get(warehouseController.show);

export default router;
