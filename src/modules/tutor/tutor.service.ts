import { prisma } from "../../lib/prisma";

export interface TutorProfilePayload {
  bio?: string;
  hourlyRate?: number;
  experience?: number;
  categoryIds?: string[];
}

const getTutorProfile = async (userId: string) => {
  return prisma.tutorProfile.findUnique({
    where: { userId },
    include: { categories: true },
  });
};

const createOrUpdateProfile = async (
  userId: string,
  payload: TutorProfilePayload
) => {
  // jodi profile exist kore..
  const existing = await prisma.tutorProfile.findUnique({ where: { userId } });

  //  update/create korar jonno data object k prepare kortese..
  const data: any = {};

  if (payload.bio !== undefined) data.bio = payload.bio;
  if (payload.hourlyRate !== undefined) data.hourlyRate = payload.hourlyRate;
  if (payload.experience !== undefined) data.experience = payload.experience;

  if (Array.isArray(payload.categoryIds) && payload.categoryIds.length > 0) {
    const connectData = payload.categoryIds.map((id) => ({ id }));
    if (existing) {
      data.categories = { set: connectData }; // update kore
    } else {
      data.categories = { connect: connectData }; // create korbe
    }
  }

  if (existing) {
    // update
    return prisma.tutorProfile.update({
      where: { userId },
      data,
      include: { categories: true },
    });
  }

  // create requires required fields
  if (payload.hourlyRate === undefined || payload.experience === undefined) {
    throw new Error("hourlyRate and experience are required for creating profile");
  }

  return prisma.tutorProfile.create({
    data: {
      userId,
      bio: payload.bio || "",
      hourlyRate: payload.hourlyRate,
      experience: payload.experience,
      categories: data.categories, 
    },
    include: { categories: true },
  });
};

const getAllTutors = async () => {
  return prisma.tutorProfile.findMany({
    include: { user: true, categories: true },
  });
};

const getTutorById = async (id: string) => {
  return prisma.tutorProfile.findUnique({
    where: { id },
    include: { user: true, categories: true },
  });
};

export const TutorService = {
  getTutorProfile,
  createOrUpdateProfile,
  getAllTutors,
  getTutorById,
};
