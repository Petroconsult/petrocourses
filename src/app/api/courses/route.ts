// api/courses/route.ts
import { NextResponse } from "next/server";
import { listCourses } from "@/modules/training/services/course.service";

export async function GET(req: Request) {
  const params = Object.fromEntries(new URL(req.url).searchParams);
  const data = await listCourses(params);
  return NextResponse.json(data);
}
