import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseError, ResponseSuccess } from '../interfaces';
import { AppErrorCode, AppErrorCodeCustome, AppErrorMessage } from '../enums';

@Injectable()
export class ResponseGeneratorService {
  /**
   * generator for build success response object
   * @param data
   * @returns @interface ResponseSuccess
   */
  success<T>(data: T): ResponseSuccess<T> {
    return {
      code: '000',
      message: 'Success',
      data,
    };
  }

  /**
   * generator for build create response object
   * @param data
   * @returns @interface ResponseSuccess
   */
  created<T>(data: T): ResponseSuccess<T> {
    return {
      code: '100',
      message: 'Created',
      data,
    };
  }

  error(statusCode: HttpStatus, code: string): ResponseError {
    const codeError = AppErrorMessage?.[code]
      ? code
      : AppErrorCodeCustome.CUSTOME;
    const messageError = AppErrorMessage?.[codeError] ?? code;

    return {
      statusCode: statusCode,
      code: codeError,
      message: messageError,
    };
  }

  /**
   * response error builder for internal server error.
   * @returns @interface ResponseError
   */
  internalServerError(): ResponseError {
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      code: AppErrorCode.INTERNAL_SERVER_ERROR,
      message: AppErrorMessage[AppErrorCode.INTERNAL_SERVER_ERROR],
    };
  }

  /**
   * response error builder prisma error.
   * @returns @interface ResponseError
   */
  prisma(): ResponseError {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      code: AppErrorCode.PRISMA_ERROR,
      message: AppErrorMessage[AppErrorCode.PRISMA_ERROR],
    };
  }

  /**
   * response error builder data not found.
   * @returns @interface ResponseError
   */
  notFound(message: string = AppErrorCode.NOT_FOUND): ResponseError {
    return this.error(HttpStatus.NOT_FOUND, message);
  }

  badRequest(message: string = AppErrorCode.BAD_REQUEST): ResponseError {
    return this.error(HttpStatus.BAD_REQUEST, message);
  }

  unauthorized(message: string = AppErrorCode.UNAUTHORIZED): ResponseError {
    return this.error(HttpStatus.UNAUTHORIZED, message);
  }

  forbidden(message: string = AppErrorCode.FORBIDDEN): ResponseError {
    return this.error(HttpStatus.FORBIDDEN, message);
  }

  validationPipe(error: string[]): ResponseError {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      code: AppErrorCode.VALIDATION_ERROR,
      message: error?.[0] ?? AppErrorMessage[AppErrorCode.VALIDATION_ERROR],
    };
  }
}
