import  { MongoCommon } from "./../../lib/mongodb";
import { Helpers } from "../../lib/helper";
const MongoData = new MongoCommon();
const helper = new Helpers();

export class PostMongoBase {
    constructor(db) {
        this.db = db;
        this.col_post = this.db.collection("posts");
    }

    async listPost() {
        const docs = await this.col_post.find({}).toArray();
        return helper.FormatCMTime(MongoData.Many(docs));
    }

    async getPost(id) {
        const doc = await this.col_post.findOne({_id: id});
        if (!doc) {
            return `${id} not found`;
        }
        return helper.CMtime(MongoData.One(doc));
    }

    async createPost(post) {
        const doc = await MongoData.ToMongo(post);
        try {
            await this.col_post.insertOne(doc);
        } catch (err) {
            if (err)  throw  err;
        }
        return post;
    }

    async updatePost(post) {
        const doc = await MongoData.ToMongo(post);
        try {
            await this.col_post.updateOne({_id: doc._id},{$set: doc});
        } catch (err) {
            if (err)  throw  err;
        }
        return MongoData.One(post);
    }

    async deletePost(id) {
        const doc = await this.getPost(id);
        try {
            await this.col_post.deleteOne({_id: id});
        } catch (e) {
            throw e;
        }
        return doc;
    }
}