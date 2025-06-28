import type { CreateUserType, UpdateUserType, UserType } from "../types/user";

export interface UserRepositoryInterface {
  getAll(): Promise<UserType[]>;
  getById(id: number): Promise<UserType>;
  create(data: CreateUserType): Promise<UserType>;
  deleteById(id: number): Promise<number>;
  update(data: UpdateUserType): Promise<UserType>;
}
