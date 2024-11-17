import express from "express";
import * as inventoryController from "../controllers/inventory-controller.js";

const router = express.Router();

// Route "/api/inventories/"
router.route("/").get(inventoryController.getAllInventory);

// Route to fetch one inventory details "/api/inventories/:id"
router.route("/:id").get(inventoryController.findOne);

// Route "/api/inventories/"
router.route("/").post(inventoryController.addItem);

// Route for deleting inventory with specific id "/api/inventories/:id"
router.route("/:id").delete(inventoryController.deleteSpecificInventory);

// Route for adding inventory "/api/inventories/:id/add"
router.route("/:id").put(inventoryController.putSpecificInventory);

export default router;
