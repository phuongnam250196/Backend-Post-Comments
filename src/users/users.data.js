import { MongoCommon } from "../../lib/mongodb";
const MongoData = new MongoCommon();

export class UserMongoBase {
    constructor(db) {
        this.db = db;
        this.col_user = this.db.collection("users");
    }

    async getUserById(id) {
        const doc = await this.col_user.findOne({_id: id});
        return MongoData.One(doc);
    }

    async getByUsername(username) {
        const doc = await this.col_user.findOne({username: username});
        return doc;
    }
}