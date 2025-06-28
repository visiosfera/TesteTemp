import { InvalidFieldError } from "../errors/invalid-field";
import type { UserRepositoryInterface } from "../interfaces/user";
import type { ServiceResultType } from "../types/service-result";
import type {
  CreateUserType,
  DeleteUserType,
  UpdateUserType,
  UserType,
} from "../types/user";

export class UserService {
  constructor(private readonly repository: UserRepositoryInterface) {}

  private validateData(data: Partial<UserType>): InvalidFieldError | null {
    if (data.description && data.description.length <= 3) {
      return new InvalidFieldError(
        "description",
        "O campo precisa de ao menos 3 caracteres.",
      );
    }

    return null;
  }

  async getAll(): Promise<ServiceResultType<UserType[], Error>> {
    try {
      return { success: true, data: await this.repository.getAll() };
    } catch (e) {
      const error =
        e instanceof Error
          ? e
          : new Error("Erro desconhecido ao obter os registros.");

      return { success: false, error: error };
    }
  }

  async getById(id: number): Promise<ServiceResultType<UserType, Error>> {
    try {
      return { success: true, data: await this.repository.getById(id) };
    } catch (e) {
      const error =
        e instanceof Error
          ? e
          : new Error("Erro desconhecido ao obter a registro.");

      return { success: false, error: error };
    }
  }

  async create(
    data: CreateUserType,
  ): Promise<ServiceResultType<UserType, Error>> {
    const validationError = this.validateData(data);
    if (validationError) {
      return { success: false, error: validationError };
    }

    try {
      return { success: true, data: await this.repository.create(data) };
    } catch (e) {
      const error =
        e instanceof Error
          ? e
          : new Error("Erro desconhecido ao criar o registro.");

      return { success: false, error: error };
    }
  }

  async deleteById(
    data: DeleteUserType,
  ): Promise<ServiceResultType<number, Error>> {
    try {
      return { success: true, data: await this.repository.deleteById(data.id) };
    } catch (e) {
      const error =
        e instanceof Error
          ? e
          : new Error("Erro desconhecido ao apagar o registro.");

      return { success: false, error: error };
    }
  }

  async update(
    data: UpdateUserType,
  ): Promise<ServiceResultType<UserType, Error>> {
    const validationError = this.validateData(data);
    if (validationError) {
      return { success: false, error: validationError };
    }

    try {
      const updated = await this.repository.update(data);
      return { success: true, data: updated };
    } catch (e) {
      const error =
        e instanceof Error
          ? e
          : new Error("Erro desconhecido ao atualizar o registro.");

      return { success: false, error };
    }
  }
}
