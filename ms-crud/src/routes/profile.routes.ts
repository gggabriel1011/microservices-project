import { Router } from "express";
import createProfile from "../controllers/profile.controller";
import { updateProfile } from "../controllers/profile.controller";
import { deleteProfile } from "../controllers/profile.controller";
import { listProfiles } from "../controllers/profile.controller";

const router = Router();

router.post("/create-profile", createProfile);
router.put("/update-profile", updateProfile);
router.delete("/delete-profile", deleteProfile);
router.get("/list-profiles", listProfiles);

export default router;
