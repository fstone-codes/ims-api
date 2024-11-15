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

//delete inventory with specific id function
export const deleteSpecificInventory = async (req, res) => {
  const inventoryId = req.params.id;
  try {
    const inventoryItem = await knex("inventories")
      .where({ id: inventoryId })
      .first();
    if (!inventoryItem) {
      return res.status(404).json({ error: "Invetory item was not found." });
    }
    await knex("inventories").where({ id: inventoryId }).del();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting a specific inventory." });
  }
};
