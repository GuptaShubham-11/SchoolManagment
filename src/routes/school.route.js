import { Router } from "express";

const router = Router();

import {
    addSchool,
    listSchools,
} from "../controllers/school.controller.js";

router.post("/addSchool", addSchool);
router.get("/listSchools", listSchools);

export default router;