import express from "express";
import * as warehouseController from "../controllers/warehouse-controller.js";

const router = express.Router();

// Route "/api/warehouses/"
router.route("/").get(warehouseController.index);

// Route for "/api/warehouses/:id"
router.route("/:id").get(warehouseController.findOne);

// Route for "/api/warehouses/:id/inventories"
router.route("/:id/inventories").get(warehouseController.inventories);

// Route to delete a specific warehouse for "/api/warehouses/:id"
router.route("/:id").delete(warehouseController.deleteOne);

// Route for "/api/warehouses/add"
router.route("/").post(warehouseController.addWarehouse);

// Route for"/api/warehouses/:id/edit"
router.route("/:id").put(warehouseController.updateWarehouse);

export default router;
