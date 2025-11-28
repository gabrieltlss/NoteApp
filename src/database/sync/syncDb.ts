// Criação do banco de dados
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();


async function sync() {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "aplicativo_notas",
            password: "AppNota123@#",
            database: "aplicativo_notas",
            multipleStatements: true
        });


        // await connection.query(`
        //     START TRANSACTION;

        //     CREATE TABLE IF NOT EXISTS user_account (
        //         id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        //         email VARCHAR(255) NOT NULL UNIQUE,
        //         createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        //         PRIMARY KEY (id)
        //     );

        //     CREATE TABLE IF NOT EXISTS user_notes (
        //         id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        //         user_id INT UNSIGNED NOT NULL,
        //         title VARCHAR(255),
        //         createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        //         status VARCHAR(25) NOT NULL DEFAULT 'active',
        //         content TEXT,
        //         PRIMARY KEY (id),
        //         CONSTRAINT fk_user_notes_user FOREIGN KEY (user_id) REFERENCES user_account(id) ON DELETE CASCADE
        //     );

        //     COMMIT;
        // `);

        connection.end();
    } catch (error) {
        throw new Error(error.message);
    }
}

sync();