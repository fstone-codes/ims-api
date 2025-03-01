import "dotenv/config";
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const connection = process.env.DB_URL
    ? process.env.DB_URL
    : {
          host: process.env.DB_HOST,
          database: process.env.DB_LOCAL_DBNAME,
          user: process.env.DB_LOCAL_USER,
          password: process.env.DB_LOCAL_PASSWORD,
      };

export default {
    client: "mysql2",
    connection,
};
