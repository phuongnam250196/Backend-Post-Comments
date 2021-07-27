import { MongoCommon } from "./../../lib/mongodb";
const MongoData = new MongoCommon();

export class AuthMongoBase {
    constructor(db) {
        this.db = db;
        this.col_auth = this.db.collection("users");
    }

    async signUp(user) {
        const doc = await MongoData.ToMongo(user);
        try {
            await this.col_auth.insertOne(doc);
        } catch (err) {
            if (err) throw err;
        }
        return user;
    }
}