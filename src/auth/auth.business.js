import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { AuthNS } from "./auth";
import { Random } from "../../lib/random";
const random = new Random();
const now = Date.now();

export class AuthServiceBase {
    constructor(AuthMongo, UserService) {
        this.AuthMongo = AuthMongo;
        this.UserService = UserService;
    }

    async signIn(params) {
        const user  = await this.UserService.getByUsername(params.username);
        if (user) {
            let passwordIsValid = bcrypt.compareSync(params.password, user.password);
            if (passwordIsValid) {
            //    return Jwt.token(payload)
                return Jwt.sign(params, process.env.TOKEN_SECRET , { expiresIn: 86400 });
            }
            return "Mật khẩu không đúng";
        }
        return `${params.username} không tồn tại.`;
    }

    async signUp(params) {
        const user = AuthNS.signUp = {
            id: random.uppercase(8),
            username: params.username,
            password: bcrypt.hashSync(params.password, 8),
            email: params.email,
            avatar: params.avatar,
            ctime: now,
            mtime: now
        }
        const doc = await this.AuthMongo.signUp(user);
        return doc;
    }
}