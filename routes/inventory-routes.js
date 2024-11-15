import express from "express";
import * as inventoryController from "../controllers/inventory-controller.js";

const router = express.Router();

// Route "/api/inventories/"
router.route("/").get(inventoryController.getAllInventory);

// Route "/api/inventories/"
router.route("/").post(inventoryController.addItem);

// Route to fetch one inventory details "/api/inventories/:id"
router.route("/:id").get(inventoryController.findOne);

//route for deleting inventory with specific id 
router.route("/:id").delete(inventoryController.deleteSpecificInventory);

export default router;
