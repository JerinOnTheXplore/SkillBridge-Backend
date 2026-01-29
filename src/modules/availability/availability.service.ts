import { prisma } from "../../lib/prisma";

interface AvailabilityPayload {
  day: string;
  startTime: string;
  endTime: string;
}

const createAvailability = async (
  tutorProfileId: string,
  payload: AvailabilityPayload
) => {
  const { day, startTime, endTime } = payload;

  if (startTime >= endTime) {
    throw new Error("Start time must be before end time");
  }

  //duplicate slot prevent kortese/..
  const exists = await prisma.availability.findFirst({
    where: {
      tutorId: tutorProfileId,
      day,
      startTime,
      endTime,
    },
  });

  if (exists) {
    throw new Error("This time slot already exists");
  }

  return prisma.availability.create({
    data: {
      tutorId: tutorProfileId,
      day,
      startTime,
      endTime,
    },
  });
};

const getMyAvailability = async (tutorProfileId: string) => {
  return prisma.availability.findMany({
    where: { tutorId: tutorProfileId },
    orderBy: { day: "asc" },
  });
};

const deleteAvailability = async (
  tutorProfileId: string,
  availabilityId: string
) => {
  const slot = await prisma.availability.findUnique({
    where: { id: availabilityId },
  });

  if (!slot) throw new Error("Availability not found");

  if (slot.tutorId !== tutorProfileId) {
    throw new Error("Unauthorized");
  }

  await prisma.availability.delete({
    where: { id: availabilityId },
  });

  return {message: "Availability deleted"};
};

export const AvailabilityService = {
  createAvailability,
  getMyAvailability,
  deleteAvailability,
};
