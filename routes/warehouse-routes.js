import express from "express";
import * as warehouseController from "../controllers/warehouse-controller.js";

const router = express.Router();

// Route "/api/warehouses/"
router.route("/").get(warehouseController.index);

// Route for "/warehouses/:id"
router.route("/:id").get(warehouseController.findOne);

// Route to delete a specific warehouse for "/warehouses/:id"
router.route("/:id").delete(warehouseController.deleteOne);

// Route for "/warehouses/:id/inventories"
router.route("/:id/inventories").get(warehouseController.inventories);

//Route for "/warehouses/add"
router.route("/").post(warehouseController.addWarehouse);

export default router;
