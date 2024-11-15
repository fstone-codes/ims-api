import express from "express";
import * as inventoryController from "../controllers/inventory-controller.js";


const router = express.Router();

router.route("/").get(inventoryController.getAllInventory);

//route for deleting inventory with specific id 
router.route("/:id").delete(inventoryController.deleteSpecificInventory);

// // Route for "/inventories"
// router.route("/").get((req, res) => (
//     res.send("Hello from inventory")
// ))

// Route for "/inventory/name"
router
    .route("/:id")

export default router;