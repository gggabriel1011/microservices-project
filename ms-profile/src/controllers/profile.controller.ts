import { Request, Response } from "express";
import Profile from "../models/Profile.model";

const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({ message: "ID is required" });
      return;
    }

    const profile = await Profile.findById(id);

    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export default getProfile;
