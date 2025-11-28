import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
const client = await mysql.createConnection({
    host: "localhost",
    user: "aplicativo_notas",
    password: "AppNota123@#",
    database: "aplicativo_notas"
});
const pool = mysql.createPool({
    host: "localhost",
    user: "aplicativo_notas",
    password: "AppNota123@#",
    database: "aplicativo_notas"
});
export { client, pool };
