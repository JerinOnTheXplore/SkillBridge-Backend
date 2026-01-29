import { prisma } from "../../lib/prisma";

const createCategory = async (name: string) => {
  return prisma.category.create({
    data: { name },
  });
};

const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { tutors: true },
      },
    },
  });
};

const updateCategory = async (id: string, name: string) => {
  const exists = await prisma.category.findUnique({ where: { id } });
  if (!exists) throw new Error("Category not found");

  return prisma.category.update({
    where: { id },
    data: { name },
  });
};

const deleteCategory = async (id: string) => {
  const exists = await prisma.category.findUnique({
    where: { id },
    include: { tutors: true },
  });

  if (!exists) throw new Error("Category not found");

  if (exists.tutors.length > 0) {
    throw new Error("Cannot delete category linked with tutors");
  }

  return prisma.category.delete({
    where: { id },
  });
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
