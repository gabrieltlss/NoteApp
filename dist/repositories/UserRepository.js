import { pool } from "../database/PgClientQuery";
// Baixo nível -> faz query e retorna-a, somente.
export class UserRepository {
    async findAll() {
        return pool.query("SELECT * FROM user_account;");
    }
    async findUserByEmail(email) {
        return pool.query("SELECT * FROM user_account WHERE email = $1;", [email]);
    }
    async createUser(name, email, password) {
        try {
            return await pool.query("INSERT INTO user_account (name, email, password) VALUES ($1, $2, $3) RETURNING *;", [name, email, password]);
        }
        catch (error) {
            throw new Error("Erro ao criar usuário.");
        }
    }
    async getUserNotes(userId) {
        return pool.query("SELECT * FROM user_notes WHERE user_id = $1;", [userId]);
    }
    async createUserNotes(userId, title, content) {
        return pool.query("INSERT INTO user_notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *;", [userId, title, content]);
    }
    async deleteUserNote(noteId) {
        return pool.query("DELETE FROM user_notes WHERE id = $1 RETURNING *;", [noteId]);
    }
    async updateNoteStatus(noteId, status) {
        return pool.query("UPDATE user_notes SET status = $1 WHERE id = $2 RETURNING *;", [status, noteId]);
    }
    async deleteUser(userId, userEmail) {
        let client;
        try {
            client = await pool.connect();
            await client.query("BEGIN;");
            await client.query("DELETE FROM user_notes WHERE user_id = $1;", [userId]);
            await client.query("DELETE FROM user_account WHERE email = $1;", [userEmail]);
            await client.query("COMMIT;");
            return true;
        }
        catch (error) {
            await client.query("ROLLBACK;");
            throw new Error("Erro ao excluir usuário.");
        }
        finally {
            if (client)
                client.release();
        }
    }
}
