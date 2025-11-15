import { UserRepository } from "../repositories/UserRepository";
import { UserServices } from "../services/UserServices";
const userRepository = new UserRepository();
const userServices = new UserServices(userRepository);
export class RenderController {
    homePage = async (req, res, next) => {
        try {
            res.render("index");
        }
        catch (error) {
            next(error);
        }
    };
    loginPage = (req, res, next) => {
        try {
            res.render("login");
        }
        catch (error) {
            next(error);
        }
    };
    registerPage = (req, res, next) => {
        try {
            res.render("register");
        }
        catch (error) {
            next(error);
        }
    };
    createNote = async (req, res, next) => {
        try {
            const userId = req.session["user"].id;
            const title = req.body.title;
            const content = req.body.content;
            const note = await userServices.createNotes(userId, title, content);
            res.status(200).json(note);
        }
        catch (error) {
            next(error);
        }
    };
    getUserInfo = async (req, res, next) => {
        try {
            const user = req.session["user"];
            res.status(200).json(user);
        }
        catch (error) {
            next(error);
        }
    };
    getUserNotes = async (req, res, next) => {
        try {
            const user = req.session["user"];
            const userNotes = await userServices.getNotes(user.id);
            res.json(userNotes);
        }
        catch (error) {
            next(error);
        }
    };
    deleteUserNote = async (req, res, next) => {
        try {
            const noteId = Number(req.params.noteId);
            const deleted = await userServices.deleteNote(noteId);
            res.status(200).json(deleted);
        }
        catch (error) {
            next(error);
        }
    };
    updateNote = async (req, res, next) => {
        try {
            const noteId = Number(req.params.noteId);
            const paramStauts = req.params.status;
            const noteStauts = paramStauts === "active" ? "active" : "archived";
            const updated = await userServices.updateNote(noteId, noteStauts);
            res.status(200).json(updated);
        }
        catch (error) {
            next(error);
        }
    };
}
