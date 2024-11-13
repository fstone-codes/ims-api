import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);



export const getAllInventory = async (req, res) => {
  console.log("Getting inventories");
  try {
    const inventories = await knex("inventories")
      .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
      .select(
        "inventories.id",
        "warehouses.warehouse_name",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      );
    res.status(200).json(inventories);
  } catch (error) {
    res.status(400).send(`Error retrieving inventories: ${error}`);
  }
};
