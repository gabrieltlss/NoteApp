import express from "express";
import session from "express-session";
import { router } from "./routes.js";
import path from "path";
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const app = express();
// Ejs
app.set("view engine", "ejs");
app.set("views", path.join("views"));
// Diretório público + urlEncoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));
// Router 
app.use(router);
app.listen(3000, () => console.log("Server initialized: http://localhost:3000/login"));
