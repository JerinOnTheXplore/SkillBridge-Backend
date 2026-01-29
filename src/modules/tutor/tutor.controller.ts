import { Request, Response } from "express";
import { TutorService, TutorProfilePayload } from "./tutor.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

const searchTutors = async (req: Request, res: Response) => {
  try {
    const result = await TutorService.searchTutors(req.query);

    res.json({
      success: true,
      message: "Tutors fetched successfully",
      ...result,
    });
  } catch (e: any) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const profile = await TutorService.getTutorProfile(req.user.userId);
    res.status(200).json({ success: true, data: profile });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createOrUpdateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const payload: TutorProfilePayload = req.body;
    const profile = await TutorService.createOrUpdateProfile(req.user.userId, payload);
    res.status(200).json({ success: true, data: profile });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllTutors = async (_req: Request, res: Response) => {
  try {
    const tutors = await TutorService.getAllTutors();
    res.status(200).json({ success: true, data: tutors });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTutorById = async (req: Request, res: Response) => {
  try {
    const tutor = await TutorService.getTutorById(req.params.id as string);
    if (!tutor) return res.status(404).json({ success: false, message: "Tutor not found" });
    res.status(200).json({ success: true, data: tutor });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const data = await TutorService.getTutorDashboard(
      req.user!.tutorProfileId!
    );

    res.json({
      success: true,
      message: "Tutor dashboard data",
      data,
    });
  } catch (e: any) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};


export const TutorController = {
  getProfile,
  createOrUpdateProfile,
  getAllTutors,
  getTutorById,
  searchTutors,
  getDashboard,
};
