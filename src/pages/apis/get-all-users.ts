import type { UserRepositoryInterface } from "@/domains/interfaces/user";
import { UserService } from "@/domains/services/user";
import type { ServiceResultType } from "@/domains/types/service-result";
import type { UserType } from "@/domains/types/user";
import { UserRepository } from "@/infrastructure/repositories/user";
import { handleServiceResult } from "@/shared/handle-error";

export async function GET(): Promise<Response> {
  const repository: UserRepositoryInterface = new UserRepository();
  const service: UserService = new UserService(repository);
  const result: ServiceResultType<UserType[], Error> = await service.getAll();
  return handleServiceResult(result);
}
