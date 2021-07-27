
import express from "express";
import { CommentNS } from "./comments";

export function NewCommentAPI(CommentService) {
    const app = express();
    app.use(express.json());

    app.get("/comment/get", async (req, res) => {
        const id = req.query.id;
        const doc = await CommentService.getComment(id);
        res.json(doc);
    })

    app.get("/comment/list", async (req, res) => {
        const docs = await CommentService.listComment();
        res.json(docs);
    })

    app.post("/comment/create", async (req, res) => {
        const params = CommentNS.createComment = {
            author: req.body.author,
            text: req.body.text
        }
        const doc = await CommentService.createComment(params);
        res.json(doc);
    })

    app.post("/comment/update", async(req, res) => {
        const id = req.query.id;
        const params = CommentNS.updateComment = {};
        if (req.body.author) {
            params.author = req.body.author;
        }
        if (req.body.text) {
            params.text = req.body.text
        }
        if (req.body.like) {
            params.like = req.body.like
        }
        // console.log('parram', req.body, req.body.like)
        const doc = await CommentService.updateComment(id, params);
        res.json(doc);
    })

    app.get("/comment/delete", async(req, res) => {
        const id = req.query.id;
        const doc = await CommentService.deleteComment(id);
        res.json(doc);
    })

    return app;
}