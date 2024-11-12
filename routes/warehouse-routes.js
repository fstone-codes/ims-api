import express from "express";

const router = express.Router();

// Route for "/warehouses"
router.route("/").get((req, res) => (
    res.send("Hello from warehouses")
))

// Route for "/warehouses/:id"
router
    .route("/:id")

export default router;