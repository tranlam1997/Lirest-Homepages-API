import { HttpStatusCode } from '../errors.enum';
import { HttpException } from './http-exceptions';

export class ForbiddenException extends HttpException {
  constructor(objectOrError: string | Record<string, any>, description = 'Forbidden') {
    super(
      HttpException.createBody(objectOrError, description, HttpStatusCode.FORBIDDEN),
      HttpStatusCode.FORBIDDEN,
    );
  }
}
