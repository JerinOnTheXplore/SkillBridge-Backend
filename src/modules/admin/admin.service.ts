import { UserStatus } from "../../../generated/prisma/enums";
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

export const AdminService = {
  listUsers,
  banUser,
  unbanUser,
  listBookings,
};
