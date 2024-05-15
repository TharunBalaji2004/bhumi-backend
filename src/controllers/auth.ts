import bcrypt from "bcrypt";
import { createToken } from "./jwt";
import prisma from "../utils/prisma";
import { Request, Response } from "express";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const dbdet = await prisma.user.findUnique({
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
    
    const match = await bcrypt.compare(password, dbpassword);
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

    const token = createToken(user);

    res.cookie("access-token", token, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User Logged in Successfully",
    });

  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const signup = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    const dbdet = await prisma.user.findUnique({
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
    const pass = await bcrypt.hash(password,10);

    const userData = await prisma.user.create({
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

    const token = createToken(user);
    res.cookie("access-token", token, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Signup Successful",
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export { login, signup };
