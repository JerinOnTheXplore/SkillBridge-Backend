import { Router } from "express";
import { TutorController } from "./tutor.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

//dashboard
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware(Role.TUTOR),
  TutorController.getDashboard
);

// only tutor er rotes..
router.get(
    "/profile/me", 
    authMiddleware, 
    roleMiddleware(Role.TUTOR), TutorController.getProfile
);

// publicRoute..
// public search
router.get("/search", TutorController.searchTutors);
router.get("/", TutorController.getAllTutors);
router.get("/:id", TutorController.getTutorById);


router.post(
    "/profile/me", 
    authMiddleware, 
    roleMiddleware(Role.TUTOR), TutorController.createOrUpdateProfile
);
router.put(
    "/profile/me", 
    authMiddleware, 
    roleMiddleware(Role.TUTOR), TutorController.createOrUpdateProfile
);

export const tutorRoutes = router;
