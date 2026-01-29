import prisma from "@/lib/db/prisma";

export async function getCourses(filters: {
  faculty: string;
  level: string;
  education: string;
  page: number;
  pageSize: number;
}) {
  const where = {
    faculty: filters.faculty !== "all" ? filters.faculty : undefined,
    level: filters.level !== "all" ? filters.level : undefined,
    education: filters.education !== "all" ? filters.education : undefined,
  };

  const totalItems = await prisma.course.count({ where });

  const items = await prisma.course.findMany({
    where,
    skip: (filters.page - 1) * filters.pageSize,
    take: filters.pageSize,
    orderBy: { createdAt: "desc" },
  });

  return {
    items,
    totalItems,
    totalPages: Math.ceil(totalItems / filters.pageSize),
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
