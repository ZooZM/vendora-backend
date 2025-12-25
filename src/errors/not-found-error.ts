import { AppError } from "../middlewares/error-handler";

export class NotFoundError extends AppError {
  constructor(title: string) {
    super(`${title} not found`, 404);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
