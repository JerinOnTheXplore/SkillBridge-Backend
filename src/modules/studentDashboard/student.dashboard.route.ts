import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import { Role } from "../../../generated/prisma/enums";
import { StudentDashboardController } from "./student.dashboard.controller";

const router = Router();

router.use(authMiddleware, roleMiddleware(Role.STUDENT));

router.get("/", StudentDashboardController.overview);

router.get("/bookings", StudentDashboardController.myBookings);

router.get("/profile", StudentDashboardController.myProfile);
router.patch("/profile", StudentDashboardController.updateProfile);

export const studentDashboardRoutes = router;
