import { Router } from "express";
import getProfile from "../controllers/profile.controller";

const router = Router();

router.post("/get-profile", getProfile);

export default router;
