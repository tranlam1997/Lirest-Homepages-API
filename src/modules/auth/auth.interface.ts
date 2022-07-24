export type Jwt = {
  userId: string;
  username: string;
  email: string;
};

export interface LoginBodyRequest {
  email: string;
  password: string;
}
