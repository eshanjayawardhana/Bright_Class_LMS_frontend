export interface CatalogCourse {
  id: number;
  title: string;
  description: string;
  thumbnail?: string;
  category: string;
  instructorName: string;
  duration?: string;
  level?: string;
  price?: number;
}