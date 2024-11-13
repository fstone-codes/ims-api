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

export { index };
