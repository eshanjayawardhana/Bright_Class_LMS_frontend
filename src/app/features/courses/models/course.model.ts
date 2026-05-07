export interface Course {
  id: number;
  title: string;
  code: string;
  description: string;
  category: string;
  year: number;
  semester: number;
  lecturerName: string;
  createdAt: string;
  lecturerEmail?: string;
}