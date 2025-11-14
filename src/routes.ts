import { Router } from "express";
import { AppController } from "./controllers/AppController";
import { RenderController } from "./controllers/RenderController";
import { loginAndRegisterAuth, homeAndLogoutAuth } from "./middlewares/authMiddleware";

const router = Router();

const appController = new AppController();
const renderController = new RenderController();

// AppController routes
router.get("/logout", homeAndLogoutAuth, appController.logout);
router.post("/login/user", loginAndRegisterAuth, appController.login);
router.post("/register/user", loginAndRegisterAuth, appController.register);
router.delete("/deleteUser", appController.delete);

// Render pages routes
router.get("/login", loginAndRegisterAuth, renderController.loginPage);
router.get("/register", loginAndRegisterAuth, renderController.registerPage);

// home
router.get("/home", homeAndLogoutAuth, renderController.homePage);
router.get("/home/user", homeAndLogoutAuth, renderController.getUserInfo);
router.get("/home/getNotes", renderController.getUserNotes);
router.post("/home/create", renderController.createNote);
router.put("/home/update/:noteId/:status", renderController.updateNote);
router.delete("/home/delete/:noteId", renderController.deleteUserNote);

export { router };