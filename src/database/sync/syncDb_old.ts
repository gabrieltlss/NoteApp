// Criação do banco de dados
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const client = new pg.Client({
    connectionString: process.env.POSTGRESQL
});

async function sync() {
    try {
        client.connect();

        await client.query(`
            BEGIN;

            CREATE TABLE IF NOT EXISTS user_account(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                createdAt DATE DEFAULT CURRENT_DATE
            );

            CREATE TABLE IF NOT EXISTS user_notes(
                id SERIAL PRIMARY KEY,
                user_id INT,
                title VARCHAR(255),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status VARCHAR(25) DEFAULT 'active', 
                content TEXT,

                FOREIGN KEY (user_id) REFERENCES user_account (id)
            );

            COMMIT;
        `);

        client.end();
    } catch (error) {
        throw new Error(error.message);
    }
}

sync();