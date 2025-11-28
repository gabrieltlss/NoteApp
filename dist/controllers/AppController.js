import { UserServices } from "../services/UserServices.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { google } from "googleapis";
import url from "url";
const userRepository = new UserRepository();
const userServices = new UserServices(userRepository);
const oauth2Client = new google.auth.OAuth2({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
});
let userCredentials = null;
export class AppController {
    login = async (req, res) => {
        try {
            // const email: string = req.body.email;
            // const password: string = req.body.password;
            // const user = await userServices.login(email, password);
            // req.session["authenticated"] = true;
            // req.session["user"] = user.getSessionInfo();
            // res.redirect("/home");
            const state = crypto.randomUUID().toString();
            req.session["state"] = state;
            const scope = "https://www.googleapis.com/auth/userinfo.email";
            const authoriationUrl = oauth2Client.generateAuthUrl({
                access_type: "offline",
                scope: scope,
                include_granted_scopes: true,
                state: state
            });
            res.redirect(authoriationUrl);
        }
        catch (error) {
            // res.render("login", { errorMessage: error.message });
        }
    };
    googleAuth = async (req, res) => {
        try {
            let googleRes = url.parse(req.url, true).query;
            if (googleRes.error) {
                throw new Error("Falha na autenticação. Tente novamente.");
            }
            else if (googleRes.state !== req.session["state"]) {
                throw new Error("Falha na autenticação. Tente novamente.");
            }
            else {
                const code = googleRes.code.toString();
                let { tokens } = await oauth2Client.getToken(code);
                oauth2Client.setCredentials(tokens);
                9;
                userCredentials = tokens;
                if (tokens.scope.includes("https://www.googleapis.com/auth/userinfo.email")) {
                    const oauth2 = google.oauth2("v2");
                    const userInfo = await oauth2.tokeninfo({
                        access_token: userCredentials.access_token,
                        id_token: userCredentials.id_token
                    });
                    console.log(userInfo.data.email);
                    // Aqui, farei chamadas ao BD para:
                    // - verificar se usuário já existe (usando o email)
                    // - Criar usuário caso não existam
                    // User exists?
                    const user = await userServices.getUser(userInfo.data.email);
                    res.redirect("/home");
                }
                else {
                    res.render("login", { errorMessage: "Permissão não concedida." });
                }
            }
        }
        catch (error) {
            res.render("login", { errorMessage: error.message });
        }
    };
    register = async (req, res) => {
        try {
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;
            const newUser = await userServices.register(name, email, password);
            req.session["authenticated"] = true;
            req.session["user"] = newUser.getSessionInfo();
            res.redirect("/home");
        }
        catch (error) {
            res.render("register", { errorMessage: error.message });
        }
    };
    delete = async (req, res) => {
        try {
            const user = req.session["user"];
            const id = user.id;
            const email = req.body.email;
            if (user.email !== email) {
                return res.json({ errorMessage: "E-mail inválido" });
            }
            const password = req.body.password;
            await userServices.deleteUser(id, email, password);
            req.session.destroy((error) => {
                if (error) {
                    throw new Error("Erro ao excluir sessão.");
                }
                res.status(200).json({ success: true });
            });
        }
        catch (error) {
            res.json({ errorMessage: error.message });
        }
    };
    logout = (req, res) => {
        try {
            req.session.destroy((error) => {
                if (error) {
                    throw new Error("Erro ao excluir sessão.");
                }
            });
            res.redirect("/");
        }
        catch (error) {
            res.json({ errorMessage: error.message });
        }
    };
}
