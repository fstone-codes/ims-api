import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const getAllInventory = async (req, res) => {
    try {
        const inventories = await knex("inventories")
            .join(
                "warehouses",
                "inventories.warehouse_id",
                "=",
                "warehouses.id"
            )
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
    let { warehouse_id, item_name, description, category, status, quantity } =
        req.body;

    // validate body contents

    // ensure no empty inputs for name + description
    if (!item_name || !description) {
        return res.status(400).json({
            error: "Please provide the name and description for the item in the request body",
        });
    }

    // ensure no empty inputs for category warehouse + status (dynamic + drop down inputs)
    if (!category || !warehouse_id || !status) {
        return res.status(400).json({
            error: "Please provide the category, warehouse and status for the item in the request body",
        });
    }

    // ensure no empty quantity, no negative numbers and the value is a number
    if (
        quantity === undefined ||
        quantity < 0 ||
        typeof quantity !== "number"
    ) {
        return res.status(400).json({
            error: "Please provide a quantity for the item in the request body",
        });
    }

    // ensure no spaces at the beginning of inputs
    item_name = item_name.trim();
    description = description.trim();

    try {
        // filter the "warehouses" table to the first warehouse/row with the "warehouse_id" from the post request body
        const checkWarehouse = await knex("warehouses")
            .where({ id: warehouse_id })
            .first();

        // ensure new inventory item's warehouse exists in "warehouses" table
        if (!checkWarehouse) {
            return res.status(400).json({
                error: `Warehouse id ${warehouse_id} not found.`,
            });
        }

        // insert request body into database ("inventories" table)
        const data = await knex("inventories").insert(req.body);

        // store newly incremented item/row id (primary key) in a variable
        const newItemId = data[0];

        // store entire new table row in a variable
        // desctructure object from array
        const [createdItem] = await knex("inventories").where({
            id: newItemId,
        });

        // create new object without timestamps (without modifying original object)
        const { created_at, updated_at, ...filteredItem } = createdItem;

        // send response status and body
        res.status(201).json(filteredItem);
    } catch (error) {
        console.error("Server post request error:", error);
        res.status(500).json({
            error: "Not able to complete request on the server",
        });
    }
};

// delete inventory with specific id function
export const deleteSpecificInventory = async (req, res) => {
    const inventoryId = req.params.id;
    try {
        const inventoryItem = await knex("inventories")
            .where({ id: inventoryId })
            .first();
        if (!inventoryItem) {
            return res
                .status(404)
                .json({ error: "Invetory item was not found." });
        }
        await knex("inventories").where({ id: inventoryId }).del();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Error deleting a specific inventory." });
    }
};

// find a specific inventory "/api/inventories/:id"
export const findOne = async (req, res) => {
    const inventoryId = req.params.id;
    try {
        const inventory = await knex("inventories")
            .join(
                "warehouses",
                "inventories.warehouse_id",
                "=",
                "warehouses.id"
            )
            // Tells the program exactly which table id to look at
            .where("inventories.id", inventoryId)
            .select(
                "inventories.id",
                "warehouses.warehouse_name",
                "inventories.item_name",
                "inventories.description",
                "inventories.category",
                "inventories.status",
                "inventories.quantity"
            )
            .first();

        if (!inventory) {
            return res
                .status(404)
                .json({ error: `Inventory with ID ${inventoryId} not found.` });
        }

        res.status(200).json(inventory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error getting inventory by ID" });
    }
};

// put/edit an inventory item
export const putSpecificInventory = async (req, res) => {
    const { id } = req.params;
    const { warehouse_id, item_name, description, category, status, quantity } =
        req.body;

    if (
        !warehouse_id ||
        !item_name ||
        !description ||
        !category ||
        !status ||
        !quantity == null
    ) {
        return res
            .status(400)
            .json({ error: "Unsucessfull because of missing properties." });
    }
    if (typeof quantity !== "number") {
        return res.status(400).json({ error: "Quantity must be a number." });
    }
    try {
        const warehouseCheck = await knex("warehouses")
            .where({ id: warehouse_id })
            .first();
        if (!warehouseCheck) {
            return res.status(400).json({
                error: "Warehouse id value does not exist in the warehouse table.",
            });
        }
        const inventoryCheck = await knex("inventories").where({ id }).first();
        if (!inventoryCheck) {
            return res
                .status(400)
                .json({ error: "Inventory id was not found. " });
        }

        // if everything checks, add inventory
        await knex("inventories").where({ id }).update({
            warehouse_id,
            item_name,
            description,
            category,
            status,
            quantity,
        });

        const [createdInventory] = await knex("inventories").where({ id });
        const { created_at, updated_at, ...newInventory } = createdInventory;

        res.status(200).json(newInventory);
    } catch (error) {
        res.status(500).json({ error: "Error updating inventory" });
    }
};
