// Business logic for courses
import type { Course } from '@/modules/training/types';

export class CourseService {

  async getCourses(): Promise<Course[]> {
    // TODO: Implement database query
    return [];
  }

  async getCourseById(id: string): Promise<Course | null> {
    // TODO: Implement database query
    return null;
  }

  async createCourse(data: Partial<Course>): Promise<Course> {
    if (!data.title) {
      throw new Error('Title is required');
    }

    // 🔒 ONLY NEW LOGIC (subcategory rule)
    if (
      data.subCategory &&
      data.category !== 'UPSTREAM'
    ) {
      throw new Error('Subcategory is only allowed for Upstream courses');
    }

    return {
      id: '1',
      title: data.title,
      description: data.description || '',
      category: data.category,
      subCategory: data.subCategory, // 👈 added
    } as Course;
  }

  async updateCourse(id: string, data: Partial<Course>): Promise<Course> {
    // 🔒 SAME RULE FOR UPDATES
    if (
      data.subCategory &&
      data.category !== 'UPSTREAM'
    ) {
      throw new Error('Subcategory is only allowed for Upstream courses');
    }

    return {
      id,
      title: data.title || '',
      description: data.description || '',
      category: data.category,
      subCategory: data.subCategory, // 👈 added
    } as Course;
  }

  async deleteCourse(id: string): Promise<boolean> {
    // TODO: Implement course deletion
    return true;
  }
}
