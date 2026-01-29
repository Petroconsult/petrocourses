// Seed script for database
import prisma from "../src/lib/db/prisma";

async function main() {
  console.log("Seeding database...");

  // Idempotent creation of a basic certification policy, pathway and levels
  const policy = await prisma.certificationPolicy.upsert({
    where: { name: "default-level-policy" },
    update: {},
    create: {
      name: "default-level-policy",
      description: "Default policy: all required modules and passing quizzes",
      rules: {
        requiredModules: ["*"],
        requiredQuizzesPassed: true
      }
    }
  });

  const pathway = await prisma.pathway.upsert({
    where: { slug: "foundations-pathway" },
    update: {},
    create: {
      slug: "foundations-pathway",
      title: "Foundations Pathway",
      description: "Introductory pathway for petroleum fundamentals",
    }
  });

  await prisma.level.upsert({
    where: { id: pathway.id + "-lvl-1" },
    update: {},
    create: {
      id: pathway.id + "-lvl-1",
      pathwayId: pathway.id,
      title: "Foundations - Level 1",
      description: "Introductory level",
      order: 1,
      price: 0.0
    }
  });

  await prisma.level.upsert({
    where: { id: pathway.id + "-lvl-2" },
    update: {},
    create: {
      id: pathway.id + "-lvl-2",
      pathwayId: pathway.id,
      title: "Foundations - Level 2",
      description: "Intermediate level",
      order: 2,
      price: 0.0
    }
  });

  console.log("Seed complete.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
