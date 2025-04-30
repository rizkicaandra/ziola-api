import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseError, ResponseSuccess } from '../interfaces';
import { AppErrorCode, AppErrorMessage } from '../enums';

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
  notFound(code: AppErrorCode): ResponseError {
    return {
      statusCode: HttpStatus.NOT_FOUND,
      code,
      message: AppErrorMessage[code],
    };
  }

  badRequest(code: AppErrorCode): ResponseError {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      code,
      message: AppErrorMessage[code],
    };
  }

  unauthorized(code: AppErrorCode): ResponseError {
    return {
      statusCode: HttpStatus.UNAUTHORIZED,
      code,
      message: AppErrorMessage[code],
    };
  }

  forbidden(code: AppErrorCode): ResponseError {
    return {
      statusCode: HttpStatus.FORBIDDEN,
      code,
      message: AppErrorMessage[code],
    };
  }

  validationPipe(error: string[]): ResponseError {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      code: AppErrorCode.VALIDATION_ERROR,
      message: error?.[0] ?? AppErrorMessage[AppErrorCode.VALIDATION_ERROR],
    };
  }
}
