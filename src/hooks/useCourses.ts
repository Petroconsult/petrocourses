"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface Course {
  id: string;
  title: string;
  level: string;
  faculty: string;
  education: string;
}

export function useCourses() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extract initial state from URL params
  const [faculty, setFaculty] = useState(searchParams.get("faculty") || "all");
  const [level, setLevel] = useState(searchParams.get("level") || "all");
  const [education, setEducation] = useState(searchParams.get("education") || "all");
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // Helper: update URL search params
  const updateUrlParams = () => {
    const params = new URLSearchParams();
    params.set("faculty", faculty);
    params.set("level", level);
    params.set("education", education);
    params.set("page", String(page));

    router.replace(`${pathname}?${params.toString()}`);
  };

  // Update URL when filters or page change
  useEffect(() => {
    updateUrlParams();
  }, [faculty, level, education, page]);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);

      const url = `/api/courses?faculty=${faculty}&level=${level}&education=${education}&page=${page}`;
      const res = await fetch(url);

      const data = await res.json();

      setCourses(data.items || []);
      setTotalPages(data.totalPages || 1);

      setLoading(false);
    };

    fetchCourses();
  }, [faculty, level, education, page]);

  return {
    faculty,
    setFaculty,
    level,
    setLevel,
    education,
    setEducation,
    page,
    setPage,
    courses,
    totalPages,
    loading,
  };
}
