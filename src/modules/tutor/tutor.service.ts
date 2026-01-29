import { prisma } from "../../lib/prisma";

export interface TutorProfilePayload {
  bio?: string;
  hourlyRate?: number;
  experience?: number;
  categoryIds?: string[];
}

interface TutorSearchQuery {
  search?: string;
  categoryId?: string;
  minRating?: string;
  minExperience?: string;
  page?: string;
  limit?: string;
}
const searchTutors = async (query: TutorSearchQuery) => {
  const {
    search,
    categoryId,
    minRating,
    minExperience,
    page = "1",
    limit = "10",
  } = query;

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const where: any = {
    user: {
      status: "ACTIVE",
      role: "TUTOR",
    },
  };

  // name search
  if (search) {
    where.user.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  // rating filter
  if (minRating) {
    where.rating = {
      gte: Number(minRating),
    };
  }

  // experience filter
  if (minExperience) {
    where.experience = {
      gte: Number(minExperience),
    };
  }

  // category filter
  if (categoryId) {
    where.categories = {
      some: {
        id: categoryId,
      },
    };
  }

  const [data, total] = await Promise.all([
    prisma.tutorProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        categories: true,
      },
      skip,
      take: limitNum,
      orderBy: { rating: "desc" },
    }),

    prisma.tutorProfile.count({ where }),
  ]);

  return {
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
    },
    data,
  };
};

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
  searchTutors,
};
