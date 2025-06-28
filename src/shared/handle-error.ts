import { InvalidFieldError } from "@/domains/errors/invalid-field";
import type { SerializedResult } from "@/domains/types/serialized-result";
import type { ServiceResultType } from "@/domains/types/service-result";
import { jsonResponse } from "./json-response";

const errorStatusMap: Record<string, number> = {
  EconnrefusedError: 503,
  FieldError: 422,
  InvalidFieldError: 422,
  UnauthorizedError: 401,
  NotFound: 404,
  RowNotAffectedError: 409,
};

function formatError(error: Error): SerializedResult<never> {
  if (error instanceof InvalidFieldError) {
    return {
      success: false,
      error: {
        name: error.name,
        message: error.message,
        fields: error.fields,
      },
    };
  }

  return {
    success: false,
    error: {
      name: error.name,
      message: error.message,
    },
  };
}

export function handleServiceResult<S, F extends Error>(
  result: ServiceResultType<S, F>,
): Response {
  if (result.success) {
    return jsonResponse(result, 200);
  }

  const status = errorStatusMap[result.error.name] || 500;
  const body = formatError(result.error);

  return jsonResponse(body, status);
}
