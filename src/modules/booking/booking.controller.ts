import { Response } from "express";
import { BookingService } from "./booking.service";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { prisma } from "../../lib/prisma";
import { BookingStatus } from "../../../generated/prisma/enums";

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
export const completeBooking = async (req: AuthRequest, res: Response) => {
  const bookingId = req.params.id as string;
  const tutorProfileId = req.user!.tutorProfileId;

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });

  if (!booking) return res.status(404).json({ message: "Booking not found" });
  if (booking.tutorId !== tutorProfileId)
    return res.status(403).json({ message: "Unauthorized access" });
  if (booking.status !== BookingStatus.CONFIRMED)
    return res.status(400).json({ message: "Only confirmed bookings can be completed" });

  const updatedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status: BookingStatus.COMPLETED },
  });

  res.status(200).json({
    success: true,
    message: "Booking marked as completed",
    data: updatedBooking,
  });
};

//student..
const cancelBooking = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await BookingService.cancelBooking(
      req.params.id as string,
      req.user!.userId
    );

    res.status(200).json({
      success: true,
      message: "Booking cancelled",
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const BookingController = {
  createBooking,
  getMyBookings,
  getTutorBookings,
  completeBooking,
  cancelBooking,
};
