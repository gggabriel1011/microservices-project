import { Request, Response } from "express";
import Profile from "../models/profile.model";
import jwt from "jsonwebtoken";


const validateProfile = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    if (decoded.id !== id) {
      return res.status(403).json({ message: "Token ID doesnt match request ID" });
    }

    return res.status(200).json({ message: "Token is valid and ID matches" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};



const createProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, lastName, cellphone, email, address } = req.body;

    if (!name || !lastName || !cellphone || !email || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProfile = new Profile({ name, lastName, cellphone, email, address });
    await newProfile.save();

    const token = jwt.sign({ id: newProfile._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h", 
    });

    return res.status(201).json({ message: "Profile created", id: newProfile._id, token });

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
export { validateProfile };
