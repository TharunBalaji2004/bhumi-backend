import prisma from "../utils/prisma";
import { Request, Response } from "express";

const donate = async (req: Request, res: Response) => {
  try {
    const { user_id, amount, types } = req.body;

    const donationData = await prisma.donate.create({
      data: {
        user_id: user_id,
        amount: amount,
        types: types
      },
    });

    return res.status(200).json({
      success: true,
      message: "Donation successful",
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export default donate;