import express from "express";
import {login, signup} from "../controllers/auth" 
import volunteer from "../controllers/volunteer";
import donate from "../controllers/donate";

const router = express.Router();

router.post("/auth/signup",signup);
router.post("/auth/login",login);

router.post("/volunteer", volunteer);
router.post("/donate", donate);

export default router;