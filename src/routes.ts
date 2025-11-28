import { Router } from "express";
import { AppController } from "./controllers/AppController.ts";
import { RenderController } from "./controllers/RenderController.ts";
import { loginAndRegisterAuth, homeAndLogoutAuth } from "./middlewares/authMiddleware.ts";

const router = Router();

const appController = new AppController();
const renderController = new RenderController();

// Render endpoint
router.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
})

// Render pages routes
router.get("/", loginAndRegisterAuth, renderController.loginPage);
// router.get("/register", loginAndRegisterAuth, renderController.registerPage);

// AppController routes
router.get("/login", loginAndRegisterAuth, appController.login);
router.get("/googleAuth", appController.googleAuth);
router.post("/register/user", loginAndRegisterAuth, appController.register);
router.get("/logout", homeAndLogoutAuth, appController.logout);
router.delete("/deleteUser", appController.delete);

// home
router.get("/home", homeAndLogoutAuth, renderController.homePage);
router.get("/home/user", homeAndLogoutAuth, renderController.getUserInfo);
router.get("/home/getNotes", renderController.getUserNotes);
router.post("/home/create", renderController.createNote);
router.put("/home/update/:noteId/:status", renderController.updateNote);
router.delete("/home/delete/:noteId", renderController.deleteUserNote);

export { router };