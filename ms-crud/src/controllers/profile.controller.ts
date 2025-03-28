import { Request, Response } from "express";
import Profile from "../models/profile.model";

const createProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, lastName, cellphone, email, address } = req.body;

    if (!name || !lastName || !cellphone || !email || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProfile = new Profile({ name, lastName, cellphone, email, address });
    await newProfile.save();

    return res.status(201).json({ message: "Profile created", id: newProfile._id });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};


export default createProfile;
