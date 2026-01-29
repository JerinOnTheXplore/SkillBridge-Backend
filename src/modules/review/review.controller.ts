import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { ReviewService } from "./review.service";

// student review create kore..
const createReview = async (req: AuthRequest, res: Response) => {
  try {
    const review = await ReviewService.createReview(
      req.user!.userId,
      req.params.bookingId as string,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: review,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get ..tutor er sob reviews..
const getTutorReviews = async (req: AuthRequest, res: Response) => {
  try {
    const reviews = await ReviewService.getTutorReviews(req.user!.tutorProfileId!);
    res.status(200).json({ success: true, data: reviews });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// student j review submit kore segulo GET kore..
const getMyReviews = async (req: AuthRequest, res: Response) => {
  try {
    const reviews = await ReviewService.getStudentReviews(req.user!.userId);
    res.status(200).json({ success: true, data: reviews });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
//update
const updateReview = async (req: AuthRequest, res: Response) => {
  try {
    const review = await ReviewService.updateReview(
      req.user!.userId,
      req.params.id as string,
      req.body
    );
    res.json({ success: true, data: review });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//delete
const deleteReview = async (req: AuthRequest, res: Response) => {
  try {
    const result = await ReviewService.deleteReview(
      req.user!.userId,
      req.params.id as string
    );
    res.json({ success: true, ...result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const ReviewController = {
  createReview,
  getTutorReviews,
  getMyReviews,
  updateReview,
  deleteReview,
};
