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

// Route "/api/inventories"
export const addItem = async (req, res) => {
    // validate body contents
    // ensure no spaces at the beginning of inputs
    req.body.item_name = req.body.item_name.trim();
    req.body.description = req.body.description.trim();

    // ensure no empty inputs for name + description
    if (!req.body.item_name || !req.body.description) {
        return res.status(400).json({
            error: "Please provide the name and description for the item in the request body",
        });
    }

    // ensure no empty inputs for category + warehouse (drop down inputs)
    if (!req.body.category || !req.body.warehouse_id) {
        return res.status(400).json({
            error: "Please provide the category and warehouse for the item in the request body",
        });
    }

    // ensure quantity is a number value
    if (!req.body.quantity || typeof req.body.quantity !== "number") {
        return res
            .status(400)
            .json({ error: "Please provide a quantity for the item in the request body" });
    }

    try {
        // insert request body into database ("inventories" table)
        const data = await knex("inventories").insert(req.body);

        // store newly incremented item/row id (primary key) in a variable
        const newItemId = data[0];

        // store entire new table row in a variable
        // desctructure object from array
        const [createdItem] = await knex("inventories").where({ id: newItemId });

        // create new object without timestamps (without modifying original object)
        const { created_at, updated_at, ...filteredItem } = createdItem;

        // send response status and body
        res.status(201).json(filteredItem);
    } catch (error) {
        console.error("Server post request error:", error);
        res.status(500).json({ message: "Server error: Not able to complete request" });
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

// Find a specific inventory "/api/inventories/:id"
export const findOne = async (req, res) => {
    const inventoryId = req.params.id;
    try {
        const inventory = await knex("inventories").where({ id: inventoryId }).first();
        if (!inventory) {
            return res.status(404).json({ error: `Inventory with ID ${id} not found.` });
        }
        res.status(200).json(inventory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error getting inventory by ID" });
    }
}