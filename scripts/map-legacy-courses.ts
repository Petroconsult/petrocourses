/**
 * Migration helper (dry-run) to map legacy Course -> Level using Prisma.
 * Run with: `ts-node scripts/map-legacy-courses.ts --dry-run` after setting DATABASE_URL
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const courses = await prisma.course.findMany({ where: { levelId: null } })
  console.log(`Found ${courses.length} legacy courses without level mapping`)

  for (const c of courses) {
    console.log('[dry-run] Would create Level for course:', c.id, c.title)
    // Real migration should create Level and set course.levelId to new level.id
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
