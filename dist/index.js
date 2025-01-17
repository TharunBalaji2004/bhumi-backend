"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router_1 = __importDefault(require("./routes/router"));
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
const port = 3000;
app.use("/api", router_1.default);
app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Server is running"
    });
});
app.listen(port, () => {
    console.log("listening port on:", port);
});
