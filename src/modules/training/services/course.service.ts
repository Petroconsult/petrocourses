// Business logic for courses
import prisma from '@/lib/db/prisma'
import { log, error } from '@/lib/logger'
import type { Course } from '@/modules/training/types'

/**
 * Course Service - Handles course CRUD operations
 * Enforces PetroCourses business rules for course categories and structure
 */
export class CourseService {
  /**
   * Get all courses - with optional filters
   */
  async getCourses(filters?: { category?: string; published?: boolean }): Promise<Course[]> {
    try {
      log('course.service.getAll', { filters })

      const courses = await prisma.course.findMany({
        where: {
          published: filters?.published !== undefined ? filters.published : true,
          category: filters?.category as any,
        },
        take: 100,
      })

      log('course.service.getAll.success', { count: courses.length })

      return courses.map((course) => this._mapToCourse(course)) as Course[]
    } catch (err) {
      error('course.service.getAll.failed', {
        error: err instanceof Error ? err.message : 'Unknown error',
      })
      return []
    }
  }

  /**
   * Get single course by ID
   */
  async getCourseById(id: string): Promise<Course | null> {
    try {
      log('course.service.getById', { courseId: id })

      const course = await prisma.course.findUnique({
        where: { id },
      })

      if (!course) {
        log('course.service.getById.notFound', { courseId: id })
        return null
      }

      log('course.service.getById.success', { courseId: id })
      return this._mapToCourse(course) as Course
    } catch (err) {
      error('course.service.getById.failed', {
        courseId: id,
        error: err instanceof Error ? err.message : 'Unknown error',
      })
      return null
    }
  }

  /**
   * Create new course - enforces subcategory rule for Upstream courses
   */
  async createCourse(data: Partial<Course>): Promise<Course> {
    try {
      if (!data.title) {
        throw new Error('Title is required')
      }

      // 🔒 Enforce business rule: subcategory only for UPSTREAM
      if (data.subCategory && data.category !== 'UPSTREAM') {
        throw new Error('Subcategory is only allowed for Upstream courses')
      }

      log('course.service.create', { title: data.title, category: data.category })

      const course = await prisma.course.create({
        data: {
          title: data.title,
          slug: data.title.toLowerCase().replace(/\s+/g, '-') + `-${Date.now()}`,
          description: data.description || '',
          category: (data.category?.toUpperCase() || 'DOWNSTREAM') as any,
          subCategory: data.subCategory,
          duration: data.duration || '4 weeks',
          level: (data.level || 'beginner') as any,
          price: data.price ? Number(data.price) : 0,
          currency: data.currency || 'USD',
          instructor: data.instructor || 'TBD',
          deliveryMode: (data.deliveryMode || 'ONLINE') as any,
          published: false,
        },
      })

      log('course.service.create.success', { courseId: course.id })
      return this._mapToCourse(course) as Course
    } catch (err) {
      error('course.service.create.failed', {
        error: err instanceof Error ? err.message : 'Unknown error',
      })
      throw err
    }
  }

  /**
   * Update existing course - enforces subcategory rule
   */
  async updateCourse(id: string, data: Partial<Course>): Promise<Course> {
    try {
      // 🔒 Enforce business rule: subcategory only for UPSTREAM
      if (data.subCategory && data.category && data.category !== 'UPSTREAM') {
        throw new Error('Subcategory is only allowed for Upstream courses')
      }

      log('course.service.update', { courseId: id })

      const course = await prisma.course.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          category: data.category ? (data.category.toUpperCase() as any) : undefined,
          subCategory: data.subCategory,
          level: data.level ? (data.level.toLowerCase() as any) : undefined,
          instructor: data.instructor,
          price: data.price ? Number(data.price) : undefined,
          featured: data.featured,
          published: data.featured !== undefined ? data.featured : undefined,
          updatedAt: new Date(),
        },
      })

      log('course.service.update.success', { courseId: id })
      return this._mapToCourse(course) as Course
    } catch (err) {
      error('course.service.update.failed', {
        courseId: id,
        error: err instanceof Error ? err.message : 'Unknown error',
      })
      throw err
    }
  }

  /**
   * Delete course by ID
   */
  async deleteCourse(id: string): Promise<boolean> {
    try {
      log('course.service.delete', { courseId: id })

      await prisma.course.delete({
        where: { id },
      })

      log('course.service.delete.success', { courseId: id })
      return true
    } catch (err) {
      error('course.service.delete.failed', {
        courseId: id,
        error: err instanceof Error ? err.message : 'Unknown error',
      })
      return false
    }
  }

  /**
   * Map Prisma Course to Course interface
   */
  private _mapToCourse(prismaData: any): Partial<Course> {
    return {
      id: prismaData.id,
      slug: prismaData.slug,
      title: prismaData.title,
      description: prismaData.description,
      category: prismaData.category?.toLowerCase() || 'downstream',
      subCategory: prismaData.subCategory,
      duration: prismaData.duration,
      level: prismaData.level || 'beginner',
      price: prismaData.price ? Number(prismaData.price) : 0,
      currency: prismaData.currency || 'USD',
      instructor: prismaData.instructor,
      thumbnail: prismaData.thumbnail,
      deliveryMode: (prismaData.deliveryMode?.toLowerCase() || 'online') as any,
      featured: prismaData.featured,
    }
  }
}
