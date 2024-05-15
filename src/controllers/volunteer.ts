import prisma from "../utils/prisma";
import { Request, Response } from "express";

const volunteer = async (req: Request, res: Response) => {
  try {
    const { user_id, fullname, email, mobile_number, location } = req.body;

    const dbdet = await prisma.volunteer.findUnique({
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

    const volunteerData = await prisma.volunteer.create({
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
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export default volunteer;