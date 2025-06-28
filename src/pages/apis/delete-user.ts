import type { UserRepositoryInterface } from "@/domains/interfaces/user";
import { UserService } from "@/domains/services/user";
import type { ServiceResultType } from "@/domains/types/service-result";
import type { DeleteUserType } from "@/domains/types/user";
import { UserRepository } from "@/infrastructure/repositories/user";
import { handleServiceResult } from "@/shared/handle-error";
import type { APIContext } from "astro";

export async function DELETE(context: APIContext): Promise<Response> {
  const repository: UserRepositoryInterface = new UserRepository();
  const service: UserService = new UserService(repository);

  const body: DeleteUserType = await context.request.json();
  const result: ServiceResultType<number, Error> =
    await service.deleteById(body);

  return handleServiceResult(result);
}
