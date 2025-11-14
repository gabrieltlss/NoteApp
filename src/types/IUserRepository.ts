import { QueryResult } from "pg";
import { UserType } from "./UserType";
import { NoteType } from "./NoteTypes";

export interface IUserRepository {
    findAll: () => Promise<QueryResult<UserType[]>>
    findUserByEmail: (email: string) => Promise<QueryResult<UserType | null>>
    createUser: (name: string, email: string, password: string) => Promise<QueryResult<UserType>>
    getUserNotes: (userId: number) => Promise<QueryResult<NoteType[] | null>>
    createUserNotes: (userId: number, title: string, content: string) => Promise<QueryResult<NoteType>>
    deleteUserNote: (noteId: number) => Promise<QueryResult<NoteType>>
    updateNoteStatus: (noteId: number, status: "archived" | "active") => Promise<QueryResult<NoteType>>
    deleteUser: (userId: number, userEmail: string) => Promise<Boolean>
}