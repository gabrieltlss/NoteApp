export class UserAccount {
    private id: number;
    private name: string;
    private email: string;
    private password: string;
    private createdAt: Date;

    constructor(id: number, name: string, email: string, password: string, createdAt: Date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
    }

    // Fazer um verificação aqui. Como?
    public getSessionInfo() {
        return { id: this.id, name: this.name, email: this.email, createdAt: this.createdAt };
    }
}   