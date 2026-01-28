import { Response } from "express";
import { BookingService } from "./booking.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

//studdent..
const createBooking = async (req: AuthRequest, res:Response) => {
  const booking =await BookingService.createBooking(
    req.user!.userId,
    req.body.tutorId,
    new Date(req.body.date)
  );

  res.status(201).json({
    success: true,
    message: "Booking created successfully..",
    data: booking,
  });
};

//student
const getMyBookings = async (req: AuthRequest, res: Response) => {
  const bookings = await BookingService.getStudentBookings(req.user!.userId);

  res.status(200).json({
    success: true,
    data: bookings,
  });
};

//tutor
const getTutorBookings = async (req: AuthRequest, res:Response) => {
  const bookings=await BookingService.getTutorBookings(req.user!.tutorProfileId);

  res.status(200).json({
    success: true,
    data: bookings,
  });
};

//tuor
const completeBooking = async (req: AuthRequest, res: Response) => {
  const booking= await BookingService.completeBooking(
    req.params.id as string,
    req.user!.tutorProfileId
  );

  res.status(200).json({
    success: true,
    message: "Booking marked as completed..",
    data: booking,
  });
};

//student..
const cancelBooking =async (req: AuthRequest, res: Response) => {
  const booking =await BookingService.cancelBooking(
    req.params.id as string,
    req.user!.userId
  );

  res.status(200).json({
    success: true,
    message: "Booking cancelled",
    data: booking,
  });
};

export const BookingController = {
  createBooking,
  getMyBookings,
  getTutorBookings,
  completeBooking,
  cancelBooking,
};
