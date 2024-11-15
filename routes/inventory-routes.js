import express from "express";
import * as inventoryController from "../controllers/inventory-controller.js";

const router = express.Router();

// Route "/api/inventories/"
router.route("/").get(inventoryController.getAllInventory);

// Route "/api/inventories/"
router.route("/").post(inventoryController.addItem);

//route for deleting inventory with specific id 
router.route("/:id").delete(inventoryController.deleteSpecificInventory);


//route for adding inventory
router.route("/:id").put(inventoryController.putSpecificInventory)

// // Route for "/inventories"
// router.route("/").get((req, res) => (
//     res.send("Hello from inventory")
// ))

// Route for "/inventory/name"
router.route("/:id");

export default router;
