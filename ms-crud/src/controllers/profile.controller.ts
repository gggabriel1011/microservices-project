import { Request, Response } from "express";
import Profile from "../models/profile.model";
import jwt from "jsonwebtoken";

/**
 * Validates if a JWT token matches the given profile ID.
 * route --> POST /api/validate-profile
 * access --> Protected via Basic Auth
 */
export const validateProfile = async (req: Request, res: Response): Promise<Response> => {
  const { id, token } = req.body;

  // Ensure both ID and token are provided
  if (!id || !token) {
    return res.status(400).json({ message: "ID and token are required" });
  }

  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    // Check if the ID inside the token matches the provided ID
    if (decoded.id !== id) {
      return res.status(403).json({ message: "Token doesnt match the request ID" });
    }

    // Token is valid and matches
    return res.status(200).json({ message: "Token is valid and matches the profile ID" });
  } catch (error) {
    // Invalid or expired token
    return res.status(401).json({ message: "Invalid token", error });
  }
};

/**
 * Creates a new profile document and returns a JWT token linked to the created profile.
 * route --> POST /api/create-profile
 * access --> Protected via Basic Auth
 */
export const createProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = req.body;

    // Handle multiple profile creation
    if (Array.isArray(data)) {
      if (!data.length) {
        return res.status(400).json({ message: "Empty array received" });
      }

      // Validate all profiles fields in the array
      const invalid = data.find(p => !p.name || !p.lastName || !p.cellphone || !p.email || !p.address);
      if (invalid) {
        return res.status(400).json({ message: "All fields are required for each profile" });
      }

      // Insert profiles into DB
      const createdProfiles = await Profile.insertMany(data);

      // Generate token for each one
      const results = createdProfiles.map(profile => {
        const token = jwt.sign({ id: profile._id }, process.env.JWT_SECRET as string, {
          expiresIn: "1h",
        });
        return {
          id: profile._id,
          token
        };
      });

      return res.status(201).json({
        message: "Profiles created successfully",
        count: createdProfiles.length,
        profiles: results
      });
    }

    // Handle single profile creation
    const { name, lastName, cellphone, email, address } = data;

    // Check if all required fields are present
    if (!name || !lastName || !cellphone || !email || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create and save the new profile in the database
    const newProfile = new Profile({ name, lastName, cellphone, email, address });
    await newProfile.save();

    // Generate a JWT token that contains the profile's ID
    const token = jwt.sign({ id: newProfile._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    // Return profile ID and generated token
    return res.status(201).json({
      message: "Profile created",
      id: newProfile._id,
      token,
    });

  } catch (error) {
    // Catch unexpected server errors
    return res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Updates an existing profile document by its ID.
 * route --> PUT /api/update-profile
 * access --> Protected via Basic Auth
 */
export const updateProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id, name, lastName, cellphone, email, address } = req.body;

    // ID is required to update a specific profile
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    // Find profile by ID and apply updates
    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      { name, lastName, cellphone, email, address },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Return updated profile
    return res.status(200).json({ message: "Profile updated", profile: updatedProfile });
  } catch (error) {
    // Catch unexpected server errors
    return res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Deletes a profile by its ID.
 * route --> DELETE /api/delete-profile
 * access --> Protected via Basic Auth
 */
export const deleteProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.body;

    // Ensure the profile ID is provided
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    // Delete the profile
    const deleted = await Profile.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Return delete confirmation
    return res.status(200).json({ message: "Profile deleted successfully", profile: deleted });
  } catch (error) {
    // Catch unexpected server errors
    return res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Lists all existing profiles in the database.
 * route --> GET /api/list-profiles
 * access --> Protected via Basic Auth
 */
export const listProfiles = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Retrieve all documents in the "profiles" collection in MongoDB database
    const profiles = await Profile.find();

    return res.status(200).json({ profiles });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Export createProfile as the default
export default createProfile;
