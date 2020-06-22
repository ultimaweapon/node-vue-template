export interface AppError {
  message: string;
  error: Error;
}

export interface State {
  errors: AppError[];
  message: string;
}
