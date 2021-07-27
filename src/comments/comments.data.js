import { MongoCommon } from "../../lib/mongodb";
import { Helpers } from "../../lib/helper";
const MongoData = new MongoCommon();
const helper = new Helpers();

export class CommentMongoBase {
    constructor(db) {
        this.db = db;
        this.col_comment = this.db.collection("comments");
    }

    async getComment(id) {
        const doc = await this.col_comment.findOne({_id: id});
        console.log("id", id, doc)
        if (!doc) {
            return `${id} not found`;
        }
        return helper.CMtime(MongoData.One(doc));
    }

    async listComment() {
        const docs = await this.col_comment.find({}).toArray();
        return helper.FormatCMTime(MongoData.Many(docs));
    }

    async createComment(comment) {
        const doc = await MongoData.ToMongo(comment);
        try {
            await this.col_comment.insertOne(doc);
        } catch(err) {
            if (err) throw err;
        }
        return comment;
    }

    async updateComment(comment) {
        const doc = await MongoData.ToMongo(comment);
        try {
            await this.col_comment.updateOne({_id: doc._id}, {$set: doc});
        } catch (err) {
            if (err) throw err;
        }
        return comment;
    }

    async deleteComment(id) {
        const doc = await this.getComment(id);
        if (!doc) {
            return `${id} not found`;
        }
        try {
            await this.col_comment.deleteOne({_id: id});
        } catch (err) {
            if (err) throw err;
        }
        return doc;
    }
}