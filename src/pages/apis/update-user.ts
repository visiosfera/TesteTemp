import type { UserRepositoryInterface } from "@/domains/interfaces/user";
import { UserService } from "@/domains/services/user";
import type { ServiceResultType } from "@/domains/types/service-result";
import type { UpdateUserType, UserType } from "@/domains/types/user";
import { UserRepository } from "@/infrastructure/repositories/user";
import { handleServiceResult } from "@/shared/handle-error";
import type { APIContext } from "astro";

export async function PATCH(context: APIContext): Promise<Response> {
  const repository: UserRepositoryInterface = new UserRepository();
  const service: UserService = new UserService(repository);

  const body: UpdateUserType = await context.request.json();
  const result: ServiceResultType<UserType, Error> = await service.update(body);

  return handleServiceResult(result);
}
