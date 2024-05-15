"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("./jwt");
const prisma_1 = __importDefault(require("../utils/prisma"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const dbdet = yield prisma_1.default.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!dbdet) {
            return res.status(200).json({
                success: false,
                message: "User doesn't exist",
            });
        }
        const dbpassword = dbdet.password;
        const match = yield bcrypt_1.default.compare(password, dbpassword);
        if (!match) {
            return res.status(200).json({
                success: false,
                message: "Password mismatch"
            });
        }
        const user = {
            user_id: dbdet.user_id,
            name: dbdet.name,
            email: dbdet.email,
        };
        const token = (0, jwt_1.createToken)(user);
        res.cookie("access-token", token, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
        });
        return res.status(200).json({
            success: true,
            message: "User Logged in Successfully",
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password } = req.body;
        const dbdet = yield prisma_1.default.user.findUnique({
            where: {
                email: email,
            },
        });
        if (dbdet) {
            return res.status(200).json({
                success: false,
                message: "User already exists",
            });
        }
        const pass = yield bcrypt_1.default.hash(password, 10);
        const userData = yield prisma_1.default.user.create({
            data: {
                name: username,
                email: email,
                password: pass,
            },
        });
        const user = {
            user_id: userData.user_id,
            name: username,
            email,
        };
        const token = (0, jwt_1.createToken)(user);
        res.cookie("access-token", token, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
        });
        return res.status(200).json({
            success: true,
            message: "Signup Successful",
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.signup = signup;
