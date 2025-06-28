import { NotFoundError } from "@/domains/errors/not-found";
import { RowNotAffectedError } from "@/domains/errors/row-not-affected";
import type { UserRepositoryInterface } from "@/domains/interfaces/user";
import type {
  CreateUserType,
  UpdateUserType,
  UserType,
} from "@/domains/types/user";
import postgres from "../database/postgres";

export class UserRepository implements UserRepositoryInterface {
  tableName: string = "users";

  private async getUserOrFail(id: number): Promise<UserType> {
    const row = await postgres<UserType>(this.tableName)
      .where("id", id)
      .first();
    if (!row) {
      throw new NotFoundError(`Usuário com o id ${id} não encontrado.`);
    }

    return row;
  }

  async getAll(): Promise<UserType[]> {
    return await postgres<UserType>(this.tableName).select("*");
  }

  async getById(id: number): Promise<UserType> {
    return await this.getUserOrFail(id);
  }

  async create(data: CreateUserType): Promise<UserType> {
    const [row] = await postgres<UserType>(this.tableName)
      .insert(data)
      .returning("*");

    return row;
  }

  async deleteById(id: number): Promise<number> {
    await this.getUserOrFail(id);

    const deletedCount = await postgres(this.tableName).where("id", id).del();
    if (deletedCount === 0) {
      throw new RowNotAffectedError(`Nenhum usuário foi deletado.`);
    }

    return id;
  }

  async update(data: UpdateUserType): Promise<UserType> {
    await this.getUserOrFail(data.id);

    const fieldsToUpdate: Partial<UpdateUserType> = Object.fromEntries(
      Object.entries(data).filter(
        ([_, v]) =>
          v !== undefined && (typeof v !== "string" || v.trim() !== ""),
      ),
    );

    const [row] = await postgres<UserType>(this.tableName)
      .where("id", data.id)
      .update({
        ...fieldsToUpdate,
        updatedAt: new Date(),
      })
      .returning("*");

    if (!row) {
      throw new RowNotAffectedError(
        `Falha ao atualizar o usuário com id ${data.id}`,
      );
    }

    return row;
  }
}
