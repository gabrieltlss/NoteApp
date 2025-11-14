import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const client = new pg.Client({
    connectionString: process.env.POSTGRESQL
});

const pool = new pg.Pool({
    connectionString: process.env.POSTGRESQL
});

export { client, pool };