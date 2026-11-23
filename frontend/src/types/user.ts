export type Role = "CUSTOMER" | "ADMIN";

export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}
