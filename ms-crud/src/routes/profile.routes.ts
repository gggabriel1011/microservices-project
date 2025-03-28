import { Router } from "express";
import createProfile from "../controllers/profile.controller";

const router = Router();

router.post("/create-profile", createProfile);

export default router;
