import { Random } from "../../lib/random";
import { PostNS } from "./posts";
const random = new Random();
const now = Date.now();

export class PostServiceBase {
    constructor(PostMongo) {
        this.PostMongo = PostMongo;
    }

    async listPost() {
        const docs = await this.PostMongo.listPost();
        return docs;
    }

    async getPost(id) {
        const doc = await this.PostMongo.getPost(id);
        return doc;
    }

    async createPost(params) {
        const post = PostNS.createPost = {
            id: random.uppercase(8),
            author: params.author,
            content: params.content,
            comments: [],
            ctime: now,
            mtime: now
        }
        const doc = await this.PostMongo.createPost(post);
        return doc;
    }

    async updatePost(id, params) {
        const post = await this.getPost(id);
        if (typeof post == "string") {
            return `${id} not exist`;
        }
        if (params.author) {
            post.author = params.author;
            post.mtime = now;
        }
        if (params.content) {
            post.content = params.content;
            post.mtime = now;
        }
        const doc = await this.PostMongo.updatePost(post);
        return doc;
    }

    async deletePost(id) {
        const post = await this.getPost(id);
        if (typeof post == "string") {
            return `${id} not exist`;
        }
        const doc = await this.PostMongo.deletePost(id);
        return doc;
    }
}