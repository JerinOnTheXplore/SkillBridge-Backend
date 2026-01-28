import { Router } from "express";
import { BookingController } from "./booking.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import { Role } from "../../../generated/prisma/enums";


const router = Router();

//student...
router.post(
  "/",
  authMiddleware,
  roleMiddleware(Role.STUDENT),
  BookingController.createBooking
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(Role.STUDENT),
  BookingController.getMyBookings
);

router.patch(
  "/:id/cancel",
  authMiddleware,
  roleMiddleware(Role.STUDENT),
  BookingController.cancelBooking
);

//tutor..
router.get(
  "/tutor",
  authMiddleware,
  roleMiddleware(Role.TUTOR),
  BookingController.getTutorBookings
);

router.patch(
  "/:id/complete",
  authMiddleware,
  roleMiddleware(Role.TUTOR),
  BookingController.completeBooking
);

export const BookingRoutes = router;
