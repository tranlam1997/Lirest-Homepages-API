import { HttpStatusCode } from '../errors.enum';
import { HttpException } from './http-exceptions';

export class BadRequestException extends HttpException {
  constructor(objectOrError: string | Record<string, any>, description = 'Bad Request') {
    super(
      HttpException.createBody(objectOrError, description, HttpStatusCode.BAD_REQUEST),
      HttpStatusCode.BAD_REQUEST,
    );
  }
}
