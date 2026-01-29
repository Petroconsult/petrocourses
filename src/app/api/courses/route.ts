// api/courses/route.ts
import { NextResponse } from "next/server";
import { coursesData } from "@/data/courses";

export async function GET(req: Request) {
  const params = Object.fromEntries(new URL(req.url).searchParams);
  
  let results = coursesData;
  
  if (params.category) {
    results = results.filter(c => c.category === params.category);
  }
  
  if (params.level) {
    results = results.filter(c => c.level === params.level);
  }
  
  if (params.search) {
    const search = params.search.toLowerCase();
    results = results.filter(c => 
      c.title.toLowerCase().includes(search) ||
      c.description.toLowerCase().includes(search)
    );
  }
  
  return NextResponse.json(results);
}
