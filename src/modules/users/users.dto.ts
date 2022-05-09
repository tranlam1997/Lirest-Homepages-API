export interface CreateUserDto {
  firstname?: string;
  lastname?: string;
  dateOfBirth?: Date;
  phone?: string;
  email?: string;
  username?: string;
  password?: string;
}

export type UpdateUserDto = Required<CreateUserDto>;
