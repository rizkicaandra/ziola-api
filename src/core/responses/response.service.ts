import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseErrorDto } from '../dtos';
import {
  ResponseErrorDetail,
  ResponseError,
  ResponseSuccess,
} from '../interfaces';
import { AppErrorCode, AppErrorMessage, AppErrorCodeCustome } from '../enums';

@Injectable()
export class ResponseGeneratorService {
  /**
   * generator for build success response object
   * @param data
   * @returns @interface ResponseSuccess
   */
  success<T>(data: T): ResponseSuccess<T> {
    const code = HttpStatus.OK;

    return {
      code,
      status: HttpStatus[code],
      data,
    };
  }

  /**
   * generator for build create response object
   * @param data
   * @returns @interface ResponseSuccess
   */
  created<T>(data: T): ResponseSuccess<T> {
    const code = HttpStatus.CREATED;

    return {
      code,
      status: HttpStatus[code],
      data,
    };
  }

  /**
   * generator for build response error object
   * @param responseErrorDto
   * @returns @interface ResponseError
   */
  error(responseErrorDto: ResponseErrorDto): ResponseError {
    const { code, errors } = responseErrorDto;
    const errorsResult: ResponseErrorDetail[] = [];
    let errorResult: ResponseErrorDetail | undefined;

    errors.forEach((error, index) => {
      const errorMessage: string = AppErrorMessage[errors[index]];
      const errorDetail: ResponseErrorDetail = {
        code: errorMessage ? error : AppErrorCodeCustome.CUSTOME,
        message: errorMessage || error,
      };

      errorsResult.push(errorDetail);
    });

    errorResult = errorsResult.length === 1 ? errorsResult[0] : undefined;

    return {
      code,
      status: HttpStatus[code],
      error: errorResult,
      errors: errorsResult.length > 1 ? errorsResult : undefined,
    };
  }

  /**
   * response error builder for internal server error.
   * @returns @interface ResponseError
   */
  internalServerError(): ResponseError {
    return this.error({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      errors: [AppErrorCode.INTERNAL_SERVER_ERROR],
    });
  }

  /**
   * response error builder prisma error.
   * @returns @interface ResponseError
   */
  prisma(): ResponseError {
    return this.error({
      code: HttpStatus.BAD_REQUEST,
      errors: [AppErrorCode.PRISMA_ERROR],
    });
  }

  /**
   * response error builder data not found.
   * @returns @interface ResponseError
   */
  notFound(message: string): ResponseError {
    const errors = message || AppErrorCode.NOT_FOUND;

    return this.error({
      code: HttpStatus.NOT_FOUND,
      errors: [errors],
    });
  }

  badRequest(message: string): ResponseError {
    const errors = message || AppErrorCode.BAD_REQUEST;

    return this.error({
      code: HttpStatus.BAD_REQUEST,
      errors: [errors],
    });
  }

  unauthorized(message: string): ResponseError {
    const errors = message || AppErrorCode.UNAUTHORIZED;

    return this.error({
      code: HttpStatus.UNAUTHORIZED,
      errors: [errors],
    });
  }

  forbidden(message: string): ResponseError {
    const errors = message || AppErrorCode.FORBIDDEN;

    return this.error({
      code: HttpStatus.FORBIDDEN,
      errors: [errors],
    });
  }

  validationPipe(errors: string[], httpStatus: HttpStatus) {
    let errorsData: string[] = [];

    if (Array.isArray(errors)) errorsData = [...errors];
    else errorsData = [errors];

    return this.error({
      code: httpStatus,
      errors: errorsData,
    });
  }
}
