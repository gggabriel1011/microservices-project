import { Request, Response } from "express";
import Profile from "../models/Profile.model";

/**
 * Controller to retrieve a profile by its MongoDB ID.
 * 
 * route --> POST /api/get-profile
 * access --> Protected via Basic Auth + HTTPS
 * desc --> Returns the profile document if found, or an error otherwise.
 */

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;

    // Validate if ID was provided
    if (!id) {
      res.status(400).json({ message: "ID is required" });
      return;
    }

    // Search for the profile by its MongoDB ID
    const profile = await Profile.findById(id);

    // If profile is not found, return a 404
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    // Return the found profile with HTTP 200
    res.status(200).json(profile);
  } catch (error) {
    // Handle unexpected server errors
    res.status(500).json({ message: "Server error", error });
  }
};
