export type ServiceResult<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: unknown;
};
