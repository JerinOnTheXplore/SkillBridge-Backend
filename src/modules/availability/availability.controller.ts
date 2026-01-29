import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { AvailabilityService } from "./availability.service";

const createAvailability = async (req: AuthRequest, res: Response) => {
  try {
    const result = await AvailabilityService.createAvailability(
      req.user!.tutorProfileId,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Availability added",
      data: result,
    });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

const getMyAvailability = async (req: AuthRequest, res: Response) => {
  const data = await AvailabilityService.getMyAvailability(
    req.user!.tutorProfileId
  );

  res.json({ success: true, data });
};

const deleteAvailability = async (req: AuthRequest, res: Response) => {
  try {
    const result = await AvailabilityService.deleteAvailability(
      req.user!.tutorProfileId,
      req.params.id as string
    );

    res.json({ success: true, ...result });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const AvailabilityController = {
  createAvailability,
  getMyAvailability,
  deleteAvailability,
};
