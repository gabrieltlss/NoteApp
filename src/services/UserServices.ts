import { UserAccount } from "../model/UserAccount";
import { IUserRepository } from "../types/IUserRepository";
import { checkEmailInput, checkPasswordInput, checkNameInput, formatName } from "./InputAuth";
import bcrypt from "bcrypt";

// Camada para regras de negócio do usuário, de funcionalidades do sitema, de inputs e etc...
export class UserServices {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async getUser(userEmail: string) {
        const user = await this.userRepository.findUserByEmail(userEmail);
        if (user.rowCount === 0) throw new Error("Usuário não existe!");
        return user;
    }

    async login(userEmail: string, userPassword: string) {
        if (!checkEmailInput(userEmail)) {
            throw new Error("Formato de e-mail inválido");
        }
        if (!checkPasswordInput(userPassword)) {
            throw new Error("Senha inválida.");
        }

        const user = await this.getUser(userEmail);
        const { id, name, email, password, createdat } = user.rows[0];

        if (userEmail !== email || !bcrypt.compareSync(userPassword, password)) {
            throw new Error("Email ou senha inválida");
        }
        return new UserAccount(id, name, email, password, createdat);
    }

    async register(userName: string, userEmail: string, userPassword: string) {
        if (!checkEmailInput(userEmail)) {
            throw new Error("Formato de e-mail inválido");
        }
        if (!checkPasswordInput(userPassword)) {
            throw new Error("Senha inválida.");
        }
        if (!checkNameInput(userName)) {
            throw new Error("Nome inválido. Apenas letras são permitidas");
        }

        const formatedName = formatName(userName);
        const newUser = await this.userRepository.createUser(formatedName, userEmail, bcrypt.hashSync(userPassword, 10));
        const { id, name, email, password, createdat } = newUser.rows[0];

        return new UserAccount(id, name, email, password, createdat);
    }

    async getNotes(userId: number) {
        const userNotes = await this.userRepository.getUserNotes(userId);
        return userNotes.rows;
    }

    async createNotes(userId: number, title: string, content: string) {
        const result = await this.userRepository.createUserNotes(userId, title, content);
        return result.rows[0];
    }

    async deleteNote(noteId: number) {
        const result = await this.userRepository.deleteUserNote(noteId);
        return result.rows[0];
    }

    async updateNote(noteId: number, status: "archived" | "active") {
        const result = await this.userRepository.updateNoteStatus(noteId, status);
        return result.rows[0];
    }

    async deleteUser(userId: number, userEmail: string, userPassword: string) {
        if (!checkEmailInput(userEmail)) {
            throw new Error("Formato de e-mail inválido");
        }
        if (!checkPasswordInput(userPassword)) {
            throw new Error("Senha inválida.");
        }

        const user = await this.getUser(userEmail);
        const { email, password } = user.rows[0];
        if (userEmail !== email || !bcrypt.compareSync(userPassword, password)) {
            throw new Error("Email ou senha inválida");
        }

        await this.userRepository.deleteUser(userId, email);
    }
}