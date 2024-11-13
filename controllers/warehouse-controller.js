import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// Route "/api/warehouses/"
export const index = async (req, res) => {
  console.log("hello");
  try {
    const data = await knex("warehouses");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving warehouses: ${error}`);
  }
};

//Controller to get warehouse by ID
export const show = async (req, res) => {
  const warehouseId = req.params.id;
  try {
    const warehouse = await knex("warehouses")
      .where({ id: warehouseId })
      .first();
    if (!warehouse) {
      return res.status(404).json({ error: "Warehouse not found." });
    }
    res.status(200).json(warehouse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error getting warehouse by Id" });
  }
};


