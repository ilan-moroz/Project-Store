export interface User {
  firstName: string;
  lastName: string;
  email: string;
  idNumber: number; // Primary key
  password: string;
  city?: string;
  street?: string;
  role?: string;
}
