export const loginAndRegisterAuth = (req, res, next) => {
    if (req.session["authenticated"])
        res.redirect("/home");
    else
        next();
};
export const homeAndLogoutAuth = (req, res, next) => {
    if (req.session["authenticated"])
        next();
    else
        res.redirect("/login");
};
