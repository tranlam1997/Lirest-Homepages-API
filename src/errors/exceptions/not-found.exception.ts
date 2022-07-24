import { HttpStatusCode } from '../errors.enum';
import { HttpException } from './http-exceptions';

export class NotFoundException extends HttpException {
  constructor(objectOrError: string | Record<string, any>, description = 'Not Found') {
    super(
      HttpException.createBody(objectOrError, description, HttpStatusCode.NOT_FOUND),
      HttpStatusCode.NOT_FOUND,
    );
  }
}
