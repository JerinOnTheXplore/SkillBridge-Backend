import { BookingStatus, Role, UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";


const listUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

const banUser = async (userId: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { status: UserStatus.BANNED },
  });
};

const unbanUser = async (userId: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { status: UserStatus.ACTIVE },
  });
};

const listBookings = async () => {
  return prisma.booking.findMany({
    include: {
      student: {
        select: { id: true, name: true, email: true },
      },
      tutor: {
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

//stats
const getDashboardStats = async () => {
  const [
    totalUsers,
    totalStudents,
    totalTutors,
    totalAdmins,
    bannedUsers,

    totalBookings,
    confirmedBookings,
    completedBookings,
    cancelledBookings,

    totalReviews,
    tutorAgg
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: Role.STUDENT } }),
    prisma.user.count({ where: { role: Role.TUTOR } }),
    prisma.user.count({ where: { role: Role.ADMIN } }),
    prisma.user.count({ where: { status: UserStatus.BANNED } }),

    prisma.booking.count(),
    prisma.booking.count({ where: { status: BookingStatus.CONFIRMED } }),
    prisma.booking.count({ where: { status: BookingStatus.COMPLETED } }),
    prisma.booking.count({ where: { status: BookingStatus.CANCELLED } }),

    prisma.review.count(),

    prisma.tutorProfile.aggregate({
      _avg: { rating: true },
      _count: true,
    }),
  ]);

  return {
    users: {
      total: totalUsers,
      students: totalStudents,
      tutors: totalTutors,
      admins: totalAdmins,
      banned: bannedUsers,
    },

    bookings: {
      total: totalBookings,
      confirmed: confirmedBookings,
      completed: completedBookings,
      cancelled: cancelledBookings,
    },

    reviews: {
      total: totalReviews,
    },

    tutors: {
      totalProfiles: tutorAgg._count,
      avgRating: tutorAgg._avg.rating ?? 0,
    },
  };
};


export const AdminService = {
  listUsers,
  banUser,
  unbanUser,
  listBookings,
  getDashboardStats,
};
