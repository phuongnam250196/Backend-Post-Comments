import express from "express";
import { PostNS } from "./posts";
import { HttpParamsValidators } from "./../../lib/http";

export function NewPostAPI(PostService) {
    const app = express();
    app.use(express.json());

    app.get("/post/list", async (req, res) => {
        const docs = await PostService.listPost();
        res.json(docs);
    })

    app.get("/post/get", async(req, res) => {
        const id = req.query.id;
        const doc = await PostService.getPost(id);
        res.json(doc)
    })

    app.post("/post/create", async (req, res) => {
        const params = PostNS.createPost = {
            author: req.body.author,
            content: req.body.content
        }
        const doc = await PostService.createPost(params);
        res.json(doc);
    })


    app.post("/post/update", async (req, res) => {
        const id = req.query.id;
        const params = PostNS = {};
        if (req.body.author) {
            params.author = req.body.author;
        }
        if (req.body.content) {
            params.content = req.body.content
        }
        const doc = await PostService.updatePost(id, params);
        res.json(doc);
    })

    app.get("/post/delete",  async (req, res) => {
        const id = req.query.id;
        const doc = await PostService.deletePost(id);
        res.json(doc);
    })

    return app;
}