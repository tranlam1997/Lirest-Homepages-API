import { HttpStatusCode } from '../errors.enum';
import { HttpException } from './http-exceptions';

export class InternalServerErrorException extends HttpException {
  constructor(objectOrError: string | Record<string, any>, description = 'Internal Server Error') {
    super(
      HttpException.createBody(objectOrError, description, HttpStatusCode.INTERNAL_SERVER_ERROR),
      HttpStatusCode.INTERNAL_SERVER_ERROR,
    );
  }
}
