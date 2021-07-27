export class MongoCommon {
    constructor(url, obj, arr) {
        this.url = url;
        this.obj = obj;
        this.arr = arr;
    }

    async Connect(url) {
        const MongoClient = require("mongodb").MongoClient;
        const client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
        await client.connect();
        return client;
    }

    One(obj) {
        if(!obj) {
            return null;
        }
        const key_value = Object.entries(obj);
        const newObj = key_value.map(k => {
            if (k[0] == "_id") {
                k[0] = "id";
            }
            return k;
        })
        return Object.fromEntries(newObj);
    }

    Many(arr) {
        if (!arr) {
            return [];
        }
        const newArr = arr.map(el => this.One(el));
        return newArr;
    }

    ToMongo(obj) {
        if  (!obj) {
            return null;
        }
        const key_value = Object.entries(obj);
        const newObj = key_value.map(k => {
            if (k[0] == "id") {
                k[0] = "_id";
            }
            return k;
        })
        return Object.fromEntries(newObj);
    }
}