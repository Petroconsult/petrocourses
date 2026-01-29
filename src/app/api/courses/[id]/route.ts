import { NextResponse } from "next/server";
import { coursesData } from "@/data/courses";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_: Request, { params }: Params) {
  const { id } = params;

  const course = coursesData.find((c) => c.id === id);

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  return NextResponse.json(course);
}
