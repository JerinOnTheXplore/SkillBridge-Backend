import { prisma } from "../lib/prisma";

async function seedCategories() {
  const categories = [
    { id: process.env.CATEGORY1, name: "Math" },
    { id: process.env.CATEGORY2, name: "Physics" },
    { id: process.env.CATEGORY3, name: "Chemistry" },
  ];

  for (const category of categories) {
    // Check if ID is undefined
    if (!category.id) {
      throw new Error(`Category ID for "${category.name}" is missing in .env`);
    }

    // Now TS knows category.id is string
    const exists = await prisma.category.findUnique({
      where: { id: category.id },
    });

    if (!exists) {
      await prisma.category.create({
        data: {
          id: category.id, // string assured
          name: category.name,
        },
      });
      console.log(`Category created: ${category.name}`);
    }else {
      console.log(`Category already exists: ${category.name}`);
      }
  }
}

seedCategories()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
