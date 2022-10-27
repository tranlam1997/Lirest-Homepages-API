import { HttpStatusCode } from '@src/errors/errors.enum';

export interface IResultResponse<T> {
  statusCode: HttpStatusCode;
  message: string;
  data: T;
}

export class ResultResponse {
  static send<T>(data: T, message = 'Success', statusCode = HttpStatusCode.OK): IResultResponse<T> {
    return {
      statusCode,
      message,
      data,
    };
  }
}
