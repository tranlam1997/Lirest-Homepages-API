import { isObject, isString } from 'src/shared/helper';

export class HttpException extends Error {
  private readonly response: string | Record<string, any>;
  private readonly status: number;

  constructor(response: string | Record<string, any>, status: number) {
    super();
    this.response = response;
    this.status = status;
    this.initMessage();
  }

  initMessage(): void {
    if (isString(this.response)) {
      this.message = this.response;
    } else if (isObject(this.response)) {
      this.message = this.response.message;
    } else if (this.constructor) {
      this.message = this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g)?.join(' ') || 'Error';
    }
  }

  getResponse(): string | object {
    return this.response;
  }
  getStatus(): number {
    return this.status;
  }

  static createBody(
    objectOrError: string | Record<string, any>,
    description?: string,
    statusCode?: number,
  ) {
    if (!objectOrError) {
      return { statusCode, message: description };
    }
    return isObject(objectOrError) && !Array.isArray(objectOrError)
      ? objectOrError
      : { statusCode, message: objectOrError, error: description };
  }
}
