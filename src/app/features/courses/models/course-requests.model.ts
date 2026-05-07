export interface CreateCourseRequest {
  title: string;
  code: string;
  description: string;
  category: string;
  year: number;
  semester: number;
  lecturerEmail: string;
}

export interface UpdateCourseRequest extends Partial<CreateCourseRequest> {}

export interface CourseFilter {
  search?: string;
  category?: string;
  year?: number;
  semester?: number;
  page?: number;
  size?: number;
}