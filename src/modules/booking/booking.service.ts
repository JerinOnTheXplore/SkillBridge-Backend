import { prisma } from "../../lib/prisma";
import { BookingStatus } from "../../../generated/prisma/enums";

//student ekhane booking create kore..
const createBooking =async(
  studentId: string,
  tutorProfileId:string,
  date:Date
) => {
  const tutorProfile =await prisma.tutorProfile.findUnique({
    where: {id:tutorProfileId },
    include: { user: true},
  });

  if(!tutorProfile){
    throw new Error("Tutor profile not found!!");
  }

  if(tutorProfile.user.status === "BANNED"){
    throw new Error("Tutor is banned!!");
  }

  return prisma.booking.create({
    data: {
      studentId,
      tutorId: tutorProfileId,
      date,
      status: BookingStatus.CONFIRMED,
    },
  });
};

//student tar nijer booking dekhte pare..
const getStudentBookings = async (studentId: string) => {
  return prisma.booking.findMany({
    where: {studentId},
    include: {
      tutor: {
        include: {user:true},
      },
    },
    orderBy: {createdAt: "desc"},
  });
};

//tutor tar nijer booking dekhte pare...
const getTutorBookings = async(tutorProfileId: string) => {
  return prisma.booking.findMany({
    where: { tutorId:tutorProfileId },
    include: {
      student: true,
    },
    orderBy: {createdAt:"desc"},
  });
};

//tutor kono booking k completed hishebe mark korte pare..
const completeBooking = async (bookingId: string, tutorProfileId: string) => {
  const booking=await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.tutorId !== tutorProfileId) {
    throw new Error("Unauthorized access!..");
  }

  if (booking.status !== BookingStatus.CONFIRMED) {
    throw new Error("Only confirmed bookings can be completed..");
  }

  return prisma.booking.update({
    where: { id: bookingId },
    data: { status: BookingStatus.COMPLETED },
  });
};

//student booking cancel kore..
const cancelBooking=async(bookingId: string, studentId: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new Error("Booking not found!!");
  }

  if (booking.studentId !== studentId) {
    throw new Error("Unauthorized access!");
  }

  if (booking.status !== BookingStatus.CONFIRMED) {
    throw new Error("Only confirmed bookings can be cancelled!");
  }

  return prisma.booking.update({
    where: { id: bookingId },
    data: { status: BookingStatus.CANCELLED },
  });
};

export const BookingService = {
  createBooking,
  getStudentBookings,
  getTutorBookings,
  completeBooking,
  cancelBooking,
};
