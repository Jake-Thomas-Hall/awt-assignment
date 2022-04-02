export interface UserResponse {
  message: string;
  data: UserDetails;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  created: string;
  email: string;
}