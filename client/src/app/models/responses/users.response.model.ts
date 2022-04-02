export interface UsersResponse {
  message: string;
  data: User[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  created: string;
  lastLogin: string;
}