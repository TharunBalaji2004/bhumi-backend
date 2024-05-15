"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const volunteer_1 = __importDefault(require("../controllers/volunteer"));
const donate_1 = __importDefault(require("../controllers/donate"));
const router = express_1.default.Router();
router.post("/auth/signup", auth_1.signup);
router.post("/auth/login", auth_1.login);
router.post("/volunteer", volunteer_1.default);
router.post("/donate", donate_1.default);
exports.default = router;
