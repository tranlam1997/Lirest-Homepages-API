export class HttpException extends Error {
  public statusCode: number;
  public message: string;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(404, message);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(401, message);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string) {
    super(403, message);
  }
}

export class InternalServerException extends HttpException {
  constructor(message: string) {
    super(500, message);
  }
}
