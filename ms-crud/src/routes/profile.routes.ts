import { Router } from "express";
import createProfile from "../controllers/profile.controller";

import { updateProfile , 
        deleteProfile , 
        listProfiles , 
        validateProfile } from "../controllers/profile.controller";

import { verifyToken } from "../middleware/auth.middleware";
import { verifyBasicAuth } from "../middleware/basicAuth.middleware";


const router = Router();

// All routes are protected via Basic Auth

router.post("/create-profile", createProfile);
router.put("/update-profile", updateProfile);
router.delete("/delete-profile", deleteProfile);
router.get("/list-profiles", listProfiles);
router.post("/validate-profile", validateProfile);

export default router;
