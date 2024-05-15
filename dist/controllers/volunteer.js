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
const prisma_1 = __importDefault(require("../utils/prisma"));
const volunteer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, fullname, email, mobile_number, location } = req.body;
        const dbdet = yield prisma_1.default.volunteer.findUnique({
            where: {
                user_id: user_id,
            },
        });
        if (dbdet) {
            return res.status(200).json({
                success: false,
                message: "You have already registered for Volunteer",
            });
        }
        const volunteerData = yield prisma_1.default.volunteer.create({
            data: {
                user_id: user_id,
                fullname: fullname,
                email: email,
                mobile_number: mobile_number,
                location: location,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Volunteer Registration successful",
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.default = volunteer;
