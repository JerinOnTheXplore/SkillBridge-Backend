import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { StudentDashboardService } from "./student.dashboard.service";

const overview = async (req: AuthRequest, res: Response) => {
  try {
    const data = await StudentDashboardService.getDashboardOverview(
      req.user!.userId
    );

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const myBookings = async (req: AuthRequest, res: Response) => {
  try {
    const type = req.query.type as any;

    const data = await StudentDashboardService.getMyBookings(
      req.user!.userId,
      type
    );

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const myProfile = async (req: AuthRequest, res: Response) => {
  try {
    const data = await StudentDashboardService.getProfile(
      req.user!.userId
    );

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const data = await StudentDashboardService.updateProfile(
      req.user!.userId,
      req.body
    );

    res.json({
      success: true,
      message: "Profile updated",
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const StudentDashboardController = {
  overview,
  myBookings,
  myProfile,
  updateProfile,
};
