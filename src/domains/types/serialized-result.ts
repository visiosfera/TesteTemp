import type { SerializedError } from "./serialized-error";

export type SerializedResult<S> =
  | { success: true; data: S }
  | { success: false; error: SerializedError };
