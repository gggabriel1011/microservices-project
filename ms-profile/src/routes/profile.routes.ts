import { Router } from "express";
import { getProfile } from "../controllers/profile.controller";

const router = Router();

/**
 * route --> POST /api/get-profile
 * description --> Retrieves a profile by its ID from the database
 * access --> Protected via Basic Auth and HTTPS
 */
router.post("/get-profile", getProfile);

export default router;
