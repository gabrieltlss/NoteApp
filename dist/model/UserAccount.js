export class UserAccount {
    id;
    name;
    email;
    password;
    createdAt;
    constructor(id, name, email, password, createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
    }
    // Fazer um verificação aqui. Como?
    getSessionInfo() {
        return { id: this.id, name: this.name, email: this.email, createdAt: this.createdAt };
    }
}
