import express from "express";

export function NewUserAPI(UserService)  {
    const app = express();
    app.use(express.json());

    app.get("/user/profile", async (req, res) => {
        const id = req.query.id;
        const doc = await UserService.getUserById(id);
        res.json(doc);
    })

    return app;
} 