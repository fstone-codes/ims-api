import express from "express";
import * as inventoryController from "../controllers/inventory-controller.js";


const router = express.Router();

router.route("/").get(inventoryController.getAllInventory);

// // Route for "/inventories"
// router.route("/").get((req, res) => (
//     res.send("Hello from inventory")
// ))

// Route for "/inventory/name"
router
    .route("/:id")

export default router;