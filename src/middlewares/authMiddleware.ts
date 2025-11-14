import { Handler } from "express";

export const loginAndRegisterAuth: Handler = (req, res, next) => {
    if (req.session["authenticated"]) res.redirect("/home");
    else next();
}

export const homeAndLogoutAuth: Handler = (req, res, next) => {
    if (req.session["authenticated"]) next();
    else res.redirect("/login");
}