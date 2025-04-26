import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseError } from '../interfaces';
import { AppErrorCode } from '../enums';
import { ResponseGeneratorService } from '../responses';

@Injectable()
export class ExceptionUtils {
  constructor(private readonly response: ResponseGeneratorService) {}

  classifyError(exception: any): string {
    // service error
    if (exception?.code && exception?.status) return 'appFormat';

    // validation error
    if (exception?.name === 'BadRequestException') return 'badRequest';

    // default error
    return 'default';
  }

  appFormat(_, message: any): ResponseError {
    return message;
  }

  badRequest(httpStatus: HttpStatus | number, message: string[]): ResponseError {
    return this.response.validationPipe(message, httpStatus);
  }

  default(httpStatus: HttpStatus, message: string): ResponseError {
    return this.response.error({
      code: httpStatus,
      errors: [message || AppErrorCode.INTERNAL_SERVER_ERROR],
    });
  }

  isHttpStatus(value: any): boolean {
    return Object.values(HttpStatus).includes(value);
  }

  transformHttpStatus(exception: any): number {
    let result;

    if (exception instanceof HttpException) {
      result = exception.getStatus();
    } else if (this.isHttpStatus(exception?.code)) {
      result = exception.code;
    } else if (this.isHttpStatus(exception?.status)) {
      result = exception.status;
    } else {
      result = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return result;
  }
}
