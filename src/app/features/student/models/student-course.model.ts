export interface StudentCourse {
  id: number;
  title: string;
  description: string;
  thumbnail?: string;
  instructorName: string;
  enrolledAt: string;
  progress: number;
}