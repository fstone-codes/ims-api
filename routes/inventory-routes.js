import express from "express";

const router = express.Router();

// Route for "/inventory"
router.route("/").get((req, res) => (
    res.send("Hello from inventory")
))

// Route for "/inventory/name"
router
    .route("/:id")

export default router;