"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createToken = (user) => {
    const secretKey = "codingCommunity";
    const token = (0, jsonwebtoken_1.sign)({ username: user.name, id: user.user_id }, secretKey);
    return token;
};
exports.createToken = createToken;
const validateToken = (req, res, next) => {
    const token = req.cookies["access-token"];
    const secretKey = "codingCommunity";
    if (!token)
        return res.status(400).json({ error: "User not authenticated" });
    try {
        const validToken = (0, jsonwebtoken_1.verify)(token, secretKey);
        if (validToken) {
            req.authenticated = true;
            return next();
        }
    }
    catch (error) {
        return res.status(400).json({ error: error });
    }
};
exports.validateToken = validateToken;
