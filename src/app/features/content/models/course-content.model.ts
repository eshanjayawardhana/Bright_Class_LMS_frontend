import { ContentType } from './content-type.type';

export interface CourseContent {
  id: number;
  title: string;
  description: string;
  contentType: ContentType;
  url: string;
  scheduledTime?: string;
  createdAt: string;
  courseId: number;
  lecturerName: string;
}

export interface CourseContentRequest {
  title: string;
  description: string;
  contentType: ContentType;
  url: string;
  scheduledTime?: string;
  courseId: number;
}