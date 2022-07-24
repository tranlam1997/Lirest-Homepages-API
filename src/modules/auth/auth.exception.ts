import { BadRequestException } from 'src/errors/exceptions/bad-request.exception';
import { NotFoundException } from 'src/errors/exceptions/not-found.exception';

export class MissingAuthTokenException extends BadRequestException {
  constructor(objectOnError: string | Record<string, any>) {
    super(objectOnError);
  }
}

export class InvalidRefreshTokenException extends BadRequestException {
  constructor(objectOnError: string | Record<string, any>) {
    super(objectOnError);
  }
}

export class RefreshTokenExpiredException extends BadRequestException {
  constructor(objectOnError: string | Record<string, any>) {
    super(objectOnError);
  }
}

export class RefreshTokenNotFoundException extends NotFoundException {
  constructor(objectOnError: string | Record<string, any>) {
    super(objectOnError);
  }
}
