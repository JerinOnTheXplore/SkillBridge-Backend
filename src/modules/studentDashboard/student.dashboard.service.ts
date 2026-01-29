import { prisma } from "../../lib/prisma";
import { BookingStatus } from "../../../generated/prisma/enums";

const getDashboardOverview = async (studentId: string) => {
  const totalBookings = await prisma.booking.count({
    where: { studentId },
  });

  const completedBookings = await prisma.booking.count({
    where: {
      studentId,
      status: BookingStatus.COMPLETED,
    },
  });

  const upcomingBookings = await prisma.booking.count({
    where: {
      studentId,
      status: BookingStatus.CONFIRMED,
    },
  });

  const reviewsGiven = await prisma.review.count({
    where: { studentId },
  });

  return {
    totalBookings,
    completedBookings,
    upcomingBookings,
    reviewsGiven,
  };
};

const getMyBookings = async (
  studentId: string,
  type?: "upcoming" | "past"
) => {
  let where: any = { studentId };

  if (type === "upcoming") {
    where.status = BookingStatus.CONFIRMED;
  }

  if (type === "past") {
    where.status = BookingStatus.COMPLETED;
  }

  return prisma.booking.findMany({
    where,
    include: {
      tutor: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getProfile = async (studentId: string) => {
  return prisma.user.findUnique({
    where: { id: studentId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

const updateProfile = async (
  studentId: string,
  payload: { name?: string }
) => {
  return prisma.user.update({
    where: { id: studentId },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

export const StudentDashboardService = {
  getDashboardOverview,
  getMyBookings,
  getProfile,
  updateProfile,
};
