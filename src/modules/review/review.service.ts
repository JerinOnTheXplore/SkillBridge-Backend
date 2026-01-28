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
//update..
const updateReview = async (
  studentId: string,
  reviewId: string,
  payload: Partial<ReviewPayload>
) => {
  const review = await prisma.review.findUnique({ where: { id: reviewId } });
  if (!review) throw new Error("Review not found");
  if (review.studentId !== studentId) throw new Error("Unauthorized access");

  // within 7 days er modhdhe edit kore..
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - review.createdAt.getTime() > sevenDays)
    throw new Error("Review can only be edited within 7 days");

  const updated = await prisma.review.update({
    where: { id: reviewId },
    data: {
      rating: payload.rating ?? review.rating,
      comment: payload.comment ?? review.comment,
    },
  });

  // tutor rating update hoy..
  const tutorReviews = await prisma.review.findMany({
    where: { tutorId: review.tutorId },
    select: { rating: true },
  });
  const averageRating =
    tutorReviews.reduce((acc, r) => acc + r.rating, 0) / tutorReviews.length;

  await prisma.tutorProfile.update({
    where: { id: review.tutorId },
    data: { rating: averageRating },
  });

  return updated;
};
//delete
const deleteReview = async (studentId: string, reviewId: string) => {
  const review = await prisma.review.findUnique({ where: { id: reviewId } });
  if (!review) throw new Error("Review not found");
  if (review.studentId !== studentId) throw new Error("Unauthorized access");

  await prisma.review.delete({ where: { id: reviewId } });

  // totor rating update kore..
  const tutorReviews = await prisma.review.findMany({
    where: { tutorId: review.tutorId },
    select: { rating: true },
  });

  const averageRating =
    tutorReviews.length > 0
      ? tutorReviews.reduce((acc, r) => acc + r.rating, 0) / tutorReviews.length
      : 0;

  await prisma.tutorProfile.update({
    where: { id: review.tutorId },
    data: { rating: averageRating },
  });

  return { message: "Review deleted" };
};


export const ReviewService = {
  createReview,
  getTutorReviews,
  getStudentReviews,
  updateReview,
  deleteReview,
};
