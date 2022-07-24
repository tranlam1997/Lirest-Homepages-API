import { HttpStatusCode } from '../errors.enum';
import { HttpException } from './http-exceptions';

export class UnauthorizedException extends HttpException {
  constructor(objectOrError: string | Record<string, any>, description = 'Unauthorized') {
    super(
      HttpException.createBody(objectOrError, description, HttpStatusCode.UNAUTHORIZED),
      HttpStatusCode.UNAUTHORIZED,
    );
  }
}
