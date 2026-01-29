import { Router } from "express";
import { AdminController } from "./admin.controller";

import { requireAdmin } from "../../middlewares/requireAdmin";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware, requireAdmin);

router.get("/users", AdminController.listUsers);

router.patch("/users/:id/ban", AdminController.banUser);
router.patch("/users/:id/unban", AdminController.unbanUser);

router.get("/bookings", AdminController.listBookings);

export const adminRoutes = router;
