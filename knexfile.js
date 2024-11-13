import "dotenv/config";
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    database: process.env.DB_LOCAL_DBNAME || "InstockDatabase",
    user: process.env.DB_LOCAL_USER || "root",
    password: process.env.DB_LOCAL_PASSWORD || "SQL123",
    port: process.env.DB_PORT || 3306,
  },
};
