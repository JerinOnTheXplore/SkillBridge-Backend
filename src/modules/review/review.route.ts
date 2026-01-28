import { Router } from "express";
import { ReviewController } from "./review.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// student review create kore  completed booking er jonno..
router.post(
  "/bookings/:bookingId/review",
  authMiddleware,
  roleMiddleware(Role.STUDENT),
  ReviewController.createReview
);

// tutor sob review k GET kore dekhe..
router.get(
  "/tutor/reviews",
  authMiddleware,
  roleMiddleware(Role.TUTOR),
  ReviewController.getTutorReviews
);

// student sob submitted review gulo dekhte pay..
router.get(
  "/student/reviews",
  authMiddleware,
  roleMiddleware(Role.STUDENT),
  ReviewController.getMyReviews
);
router.patch("/:id/reviews", authMiddleware, ReviewController.updateReview);
router.delete("/:id/reviews", authMiddleware, ReviewController.deleteReview);

export const reviewRoutes = router;
