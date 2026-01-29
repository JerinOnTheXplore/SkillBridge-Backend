import { Router } from "express";
import { AvailabilityController } from "./availability.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(Role.TUTOR),
  AvailabilityController.createAvailability
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware(Role.TUTOR),
  AvailabilityController.getMyAvailability
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(Role.TUTOR),
  AvailabilityController.deleteAvailability
);

export const availabilityRoutes = router;
