export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
}