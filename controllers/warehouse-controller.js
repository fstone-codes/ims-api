import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// Route "/api/warehouses/"
const index = async (req, res) => {
    try {
        const data = await knex("warehouses");
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(`Error retrieving warehouses: ${error}`);
    }
};

// Route "/api/warehouses/:id"
const getWhinventories = async (req, res) => {
    try {
      const whFound = await knex("warehouses")
        .where({ id: req.params.id });
  
      if (whFound.length === 0) {
        return res.status(404).json({
          message: `Warehouse with ID ${req.params.id} not found` 
        });
      }
  
      const whData = whFound[0];
      res.json(whData);
    } catch (error) {
      res.status(500).json({
        message: `Unable to retrieve warehouse data for user with ID ${req.params.id}`,
      });
    }
  };

// Route "/api/warehouses/:id/inventories"
const inventories = async (req, res) => {
    try {
      const inventories = await knex("warehouses")
        .join("inventories", "inventories.warehouse_id", "warehouses.id")
        .where({ warehouse_id: req.params.id })
        .select(
            "inventories.id",
            "inventories.item_name",
            "inventories.category",
            "inventories.status",
            "inventories.quantity",
        );
  
      res.json(inventories);
    } catch (error) {
      res.status(500).json({
        message: `Unable to retrieve inventories for warehouse with ID ${req.params.id}: ${error}`,
      });
    }
  };

export { 
    index,
    getWhinventories,
    inventories,
 };
