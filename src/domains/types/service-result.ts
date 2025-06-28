export type ServiceResultType<S, F extends Error> =
  | { success: true; data: S }
  | { success: false; error: F };
