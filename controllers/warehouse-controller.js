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
    console.error("Get request error:", error);
    res.status(400).json({ message: `Error retrieving warehouses` });
  }
};

//Controller to get warehouse by ID "/api/warehouses/:id"
export const findOne = async (req, res) => {
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

// Route "/api/warehouses/:id/inventories"
export const inventories = async (req, res) => {
  try {
    const inventories = await knex("warehouses")
      .join("inventories", "inventories.warehouse_id", "warehouses.id")
      .where({ warehouse_id: req.params.id })
      .select(
        "inventories.id",
        "inventories.item_name",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      );

    res.status(200).json(inventories);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve inventories for warehouse with ID ${req.params.id}: ${error}`,
    });
  }
};

//controller to add new warehouse
export const addWarehouse = async (req, res) => {
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;
  if (
    !warehouse_name ||
    !address ||
    !city ||
    !country ||
    !contact_name ||
    !contact_position ||
    !contact_phone ||
    !contact_email
  ) {
    return res
      .status(400)
      .json({ message: "Please fill out all required fields." });
  }
  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
  }
  function validatePhone(phone) {
    const phonePattern = /^\+?([0-9]{1})[-. ]?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
     
    return phonePattern.test(phone);
  }
  if (!validateEmail(contact_email)) {
    return res.status(400).json({ message: "Invalid Email" });
  }
  if (!validatePhone(contact_phone)) {
    return res.status(400).json({ message: "Invalid Phone" });
  }


  try {
    const [newWarehouseId] = await knex("warehouses").insert({
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    });
    res
      .status(201)
      .json({
        message: "Warehouse added successfully!",
        warehouseId: newWarehouseId.id || newWarehouseId,
      });
  } catch (error) {
    console.error("Error creating warehouse:", error);
    res
      .status(500)
      .json({ message: "Unable to add warehouse.", error: error.message });
  }
};

export const deleteOne = async (req, res) => {
  const warehouseId = req.params.id;
  try {
    const warehouse = await knex("warehouses")
      .where({ id: warehouseId })
      .first();
    // Check if warehouse matching the id exists
    if (!warehouse) {
      return res.status(404).json({ error: "Warehouse not found." });
    }
    // Delete the warehouse
    await knex("warehouses").where({ id: warehouseId }).del();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error getting warehouse by Id" });
  }
};
