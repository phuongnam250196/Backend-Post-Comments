import { CommentNS } from "./comments";
import { Random } from "../../lib/random";
const random = new Random();
const now = Date.now();

export class CommentServiceBase {
    constructor(CommentMongo) {
        this.CommentMongo = CommentMongo;
    }

    async getComment(id) {
        const doc = await this.CommentMongo.getComment(id);
        return doc;
    }

    async listComment() {
        const docs = await this.CommentMongo.listComment();
        return docs;
    }

    async createComment(params) {
        const comment = CommentNS.createComment = {
            id: random.uppercase(8),
            author: params.author,
            text: params.text,
            like: false,
            ctime: now,
            mtime: now
        }
        const doc = await this.CommentMongo.createComment(comment);
        return doc;
    }

    async updateComment(id, params) {
        const comment = await this.getComment(id);
        if (typeof comment == "string") {
            return `${id} not exist`;
        }
        if (typeof comment == "string") {
            return `${id} not exist`;
        }
        if (params.author) {
            comment.author = params.author;
            comment.mtime = now;
        }
        if (params.text) {
            comment.text = params.text;
            comment.mtime = now;
        }
        if (params.like) {
            comment.like = true;
            comment.mtime = now;
        } else {{
            comment.like = false;
            comment.mtime = now;
        }}
        
        const doc = await this.CommentMongo.updateComment(comment);
        return doc;
    }

    async deleteComment(id) {
        const doc = await this.CommentMongo.deleteComment(id);
        return doc;
    }
}