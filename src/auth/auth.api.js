import express from "express";
import { AuthNS } from "./auth";

export function NewAuthAPI(AuthService) {
    const app = express();
    app.use(express.json());

    app.post("/auth/sign-in", async (req, res) => {
        const params = AuthNS.signIn = {
            username: req.body.username,
            password: req.body.password
        };
        const doc = await AuthService.signIn(params);
        res.json(doc);
    })

    app.post("/auth/sign-up", async (req, res) => {
        const params = AuthNS.signUp = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            avatar: req.body.avatar
        }
        const doc = await AuthService.signUp(params);
        res.json(doc);
    })

    return app;
}