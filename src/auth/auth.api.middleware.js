import Jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    let token = req.headers["authorization"];
    
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    Jwt.verify(token.substring(7), process.env.TOKEN_SECRET, (err, data) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        // console.log('data next', data)
        // req.userId = decoded.id;
        next();
    });
}