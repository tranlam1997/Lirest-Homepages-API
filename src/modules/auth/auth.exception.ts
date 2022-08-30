import { UnauthorizedException } from 'src/errors/exceptions/unauthorized.exception';

export class MissingAuthTokenException extends UnauthorizedException {
  constructor(objectOnError: string | Record<string, any>) {
    super(objectOnError);
  }
}

export class InvalidRefreshTokenException extends UnauthorizedException {
  constructor(objectOnError: string | Record<string, any>) {
    super(objectOnError);
  }
}

export class RefreshTokenExpiredException extends UnauthorizedException {
  constructor(objectOnError: string | Record<string, any>) {
    super(objectOnError);
  }
}

export class RefreshTokenNotFoundException extends UnauthorizedException {
  constructor(objectOnError: string | Record<string, any>) {
    super(objectOnError);
  }
}

export class ParamsNotSyncedWithAccessTokenException extends UnauthorizedException {
  constructor(objectOnError: string | Record<string, any>) {
    super(objectOnError);
  }
}
