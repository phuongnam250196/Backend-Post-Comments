
export class UserServiceBase  {
    constructor(UserMongo) {
        this.UserMongo = UserMongo;
    }

    async getUserById(id) {
        const doc = await this.UserMongo.getUserById(id);
        return doc;
    }

    async getByUsername(username) {
        const doc = await this.UserMongo.getByUsername(username);
        return doc;
    }
}