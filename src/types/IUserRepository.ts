import { QueryResult } from "mysql2";

export interface IUserRepository {
    findAll: () => Promise<QueryResult>
    findUserByEmail: (email: string) => Promise<QueryResult>
    createUser: (name: string, email: string, password: string) => Promise<QueryResult>
    getUserNotes: (userId: number) => Promise<QueryResult[]>
    createUserNotes: (userId: number, title: string, content: string) => Promise<QueryResult>
    deleteUserNote: (noteId: number) => Promise<QueryResult>
    updateNoteStatus: (noteId: number, status: "archived" | "active") => Promise<QueryResult>
    deleteUser: (userId: number, userEmail: string) => Promise<Boolean>
}