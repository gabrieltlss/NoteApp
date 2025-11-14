import { Handler } from "express";
import { UserServices } from "../services/UserServices";
import { UserRepository } from "../repositories/UserRepository";

const userRepository = new UserRepository();
const userServices = new UserServices(userRepository);

export class AppController {
    login: Handler = async (req, res) => {
        try {
            const email: string = req.body.email;
            const password: string = req.body.password;

            const user = await userServices.login(email, password);

            req.session["authenticated"] = true;
            req.session["user"] = user.getSessionInfo();

            res.redirect("/home");
        } catch (error) {
            res.render("login", { errorMessage: error.message });
        }
    }

    register: Handler = async (req, res) => {
        try {
            const name: string = req.body.name;
            const email: string = req.body.email;
            const password: string = req.body.password;

            const newUser = await userServices.register(name, email, password);

            req.session["authenticated"] = true;
            req.session["user"] = newUser.getSessionInfo();

            res.redirect("/home");
        } catch (error) {
            res.render("register", { errorMessage: error.message });
        }
    }

    delete: Handler = async (req, res) => {
        try {
            const user = req.session["user"];
            const id = user.id;
            const email: string = req.body.email;
            if (user.email !== email) {
                return res.json({ errorMessage: "E-mail inválido" });
            }
            const password: string = req.body.password;
            await userServices.deleteUser(id, email, password);

            req.session.destroy((error) => {
                if (error) { throw new Error("Erro ao excluir sessão.") }
                res.status(200).json({ success: true });
            })
        } catch (error) {
            res.json({ errorMessage: error.message });
        }
    }

    logout: Handler = (req, res) => {
        try {
            req.session.destroy((error) => {
                if (error) { throw new Error("Erro ao excluir sessão.") }
            });
            res.redirect("/login");
        } catch (error) {
            res.json({ errorMessage: error.message });
        }
    }
}