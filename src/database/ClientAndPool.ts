import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const client = await mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER_DB,
    password: process.env.DB_PASSWORD,
    charset: "utf8mb4"

});

const pool = mysql.createPool({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER_DB,
    password: process.env.DB_PASSWORD,
    charset: "utf8mb4"
});

export { client, pool };