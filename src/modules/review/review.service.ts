import { prisma } from "../../lib/prisma";
import { BookingStatus } from "../../../generated/prisma/enums";
import { Prisma } from "../../../generated/prisma/client";


interface ReviewPayload {
  rating: number; // 1 theke 5..
  comment?: string;
}

const createReview = async (
  studentId: string,
  bookingId: string,
  payload: ReviewPayload
) => {
  // booking exist kore kina..
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  //booking ta oi student er kina..
  if (booking.studentId !== studentId) {
    throw new Error("Unauthorized access");
  }

  //booking ta complete kina...
  if (booking.status !== BookingStatus.COMPLETED) {
    throw new Error("Only completed bookings can be reviewed");
  }

  // already review dewa hoise kina..
  const existingReview = await prisma.review.findUnique({
    where: { bookingId },
  });

  if (existingReview) {
    throw new Error("Review already submitted for this booking");
  }

  // review create kora..
  return prisma.review.create({
    data: {
      studentId,
      tutorId: booking.tutorId,
      bookingId,
      rating: payload.rating,
      comment: payload.comment,
    } as Prisma.ReviewUncheckedCreateInput,
  });
};

const getTutorReviews = async (tutorProfileId: string) => {
  return prisma.review.findMany({
    where: { tutorId: tutorProfileId },
    include: {
      student: {
        select: { id: true, name: true, email: true },
      },
      booking: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

const getStudentReviews = async (studentId: string) => {
  return prisma.review.findMany({
    where: { studentId },
    include: {
      tutor: {
        include: {
          user: {
            select: { id: true, name: true },
          },
        },
      },
      booking: true,
    },
    orderBy: {createdAt:"desc"},
  });
};

export const ReviewService = {
  createReview,
  getTutorReviews,
  getStudentReviews,
};
