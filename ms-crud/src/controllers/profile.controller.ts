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

const updateProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id, name, lastName, cellphone, email, address } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      { name, lastName, cellphone, email, address },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json({ message: "Profile updated", profile: updatedProfile });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const deleteProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.body;
    
    if (!id) {
      return res.status(400).json({ message: "ID is required"})
    }

    const deleted = await Profile.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Profile not found"});
    }

    return res.status(200).json({ message: "Profile deleted successfully", profile: deleteProfile });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const listProfiles = async (req: Request, res: Response): Promise<Response> => {
  try {
    const profiles = await Profile.find();

    return res.status(200).json({ profiles });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export default createProfile;
export { updateProfile };
export { deleteProfile };
export { listProfiles };
