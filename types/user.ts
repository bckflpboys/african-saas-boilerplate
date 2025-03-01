export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
