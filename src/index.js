import express from "express";
import cors from "cors";
import "../ext/log";
import { ReadConfig } from "./config";
import { MongoCommon } from "./../lib/mongodb";
import { PostMongoBase } from "./posts/posts.data";
import { PostServiceBase } from "./posts/posts.business";
import { NewPostAPI } from "./posts/posts.api";
import { CommentMongoBase } from "./comments/comments.data";
import { CommentServiceBase } from "./comments/comments.business";
import { NewCommentAPI } from "./comments/comments.api";
import { UserMongoBase } from "./users/users.data";
import { UserServiceBase } from "./users/users.business";
import { AuthMongoBase } from "./auth/auth.data";
import { AuthServiceBase } from "./auth/auth.business";
import { NewUserAPI } from "./users/users.api";
import { NewAuthAPI } from "./auth/auth.api";


async function main() {
    const config = await ReadConfig();
    const MongoData = new MongoCommon();
    const client = await MongoData.Connect(config.database.db_url,{ replica: true });
    console.log("connect to database");
    const database = await client.db(config.database.db_name);
    // ******************************************************************

    const PostMongo = new PostMongoBase(database);
    const PostService = new PostServiceBase(PostMongo);

    const CommentMongo = new CommentMongoBase(database);
    const CommentService = new CommentServiceBase(CommentMongo);

    const UserMongo = new UserMongoBase(database);
    const UserService = new UserServiceBase(UserMongo);

    const AuthMongo = new AuthMongoBase(database);
    const AuthService = new AuthServiceBase(AuthMongo, UserService);
    
    // ******************************************************************
    const app = express();
    app.disabled("x-powered-by");
    app.use(express.json());
    app.use(cors());

    app.use("/api/user", NewUserAPI(UserService));
    app.use("/api/auth", NewAuthAPI(AuthService));
    app.use("/api/post", NewPostAPI(PostService));
    app.use("/api/comment", NewCommentAPI(CommentService));


    console.log(`Listening on ${config.server.port}`);
    app.listen(config.server.port, "0.0.0.0", () => {
        const err = arguments[0];
        if (err) {
            console.log(err)
        }
    })
}

main().catch(err => console.log(err));