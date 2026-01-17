import { NextResponse } from "next/server";
import courses from "@/data/courses.ts";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_: Request, { params }: Params) {
  const { id } = params;

  const course = courses.find((c) => c.id === id);

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  return NextResponse.json(course);
}
