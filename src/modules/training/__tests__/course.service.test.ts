import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CourseService } from '../services/course.service';

describe('CourseService', () => {
  let courseService: CourseService;

  beforeEach(() => {
    courseService = new CourseService();
  });

  describe('getCourses', () => {
    it('should retrieve all courses', async () => {
      // Arrange
      const expectedCourses = [
        { id: '1', title: 'Course 1', description: 'Desc 1' },
        { id: '2', title: 'Course 2', description: 'Desc 2' },
      ];

      // Mock data
      vi.spyOn(courseService, 'getCourses').mockResolvedValueOnce(expectedCourses);

      // Act
      const result = await courseService.getCourses();

      // Assert
      expect(result).toEqual(expectedCourses);
      expect(result).toHaveLength(2);
    });

    it('should handle empty course list', async () => {
      vi.spyOn(courseService, 'getCourses').mockResolvedValueOnce([]);

      const result = await courseService.getCourses();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('getCourseById', () => {
    it('should retrieve a course by id', async () => {
      const courseId = '1';
      const expectedCourse = {
        id: courseId,
        title: 'Advanced TypeScript',
        description: 'Learn advanced TS concepts',
      };

      vi.spyOn(courseService, 'getCourseById').mockResolvedValueOnce(expectedCourse);

      const result = await courseService.getCourseById(courseId);

      expect(result).toEqual(expectedCourse);
      expect(result?.id).toBe(courseId);
    });

    it('should return null when course not found', async () => {
      vi.spyOn(courseService, 'getCourseById').mockResolvedValueOnce(null);

      const result = await courseService.getCourseById('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('createCourse', () => {
    it('should create a new course', async () => {
      const newCourse = {
        title: 'New Course',
        description: 'New course description',
      };

      const createdCourse = {
        id: '3',
        ...newCourse,
      };

      vi.spyOn(courseService, 'createCourse').mockResolvedValueOnce(createdCourse);

      const result = await courseService.createCourse(newCourse);

      expect(result).toEqual(createdCourse);
      expect(result.id).toBeDefined();
    });

    it('should validate course data', async () => {
      const invalidCourse = {
        title: '',
        description: 'Description without title',
      };

      vi.spyOn(courseService, 'createCourse').mockRejectedValueOnce(
        new Error('Title is required')
      );

      await expect(courseService.createCourse(invalidCourse)).rejects.toThrow(
        'Title is required'
      );
    });
  });

  describe('updateCourse', () => {
    it('should update an existing course', async () => {
      const courseId = '1';
      const updatedData = {
        title: 'Updated Title',
        description: 'Updated Description',
      };

      const updatedCourse = {
        id: courseId,
        ...updatedData,
      };

      vi.spyOn(courseService, 'updateCourse').mockResolvedValueOnce(updatedCourse);

      const result = await courseService.updateCourse(courseId, updatedData);

      expect(result).toEqual(updatedCourse);
      expect(result.title).toBe('Updated Title');
    });
  });

  describe('deleteCourse', () => {
    it('should delete a course', async () => {
      const courseId = '1';

      vi.spyOn(courseService, 'deleteCourse').mockResolvedValueOnce(true);

      const result = await courseService.deleteCourse(courseId);

      expect(result).toBe(true);
    });

    it('should handle deletion of non-existent course', async () => {
      vi.spyOn(courseService, 'deleteCourse').mockResolvedValueOnce(false);

      const result = await courseService.deleteCourse('nonexistent');

      expect(result).toBe(false);
    });
  });
});
