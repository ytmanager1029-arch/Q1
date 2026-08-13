export class AppError extends Error {
  statusCode: number;
  errors?: unknown;
  expose: boolean;

  constructor(statusCode: number, message: string, errors?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.expose = statusCode < 500;
    this.name = "AppError";
  }
}
