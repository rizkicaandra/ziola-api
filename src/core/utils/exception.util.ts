import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseError } from '../interfaces';
import { AppErrorCode } from '../enums';
import { ResponseGeneratorService } from '../responses';
import { CustomeExceptionDto } from '../dtos';

@Injectable()
export class ExceptionUtils {
  constructor(private readonly response: ResponseGeneratorService) {}

  classifyError(exception: any): string {
    // service error
    if (exception?.code && exception?.statusCode) return 'appFormat';

    if (
      typeof exception?.response === 'object' &&
      Array.isArray((exception?.response as { message: any }).message)
    )
      return 'validation';

    // default error
    return 'default';
  }

  appFormat(errorDto: CustomeExceptionDto): ResponseError {
    return errorDto.message;
  }

  validation(errorDto: CustomeExceptionDto): ResponseError {
    return this.response.validationPipe(errorDto.message);
  }

  default(errorDto: CustomeExceptionDto): ResponseError {
    return {
      code: AppErrorCode.INTERNAL_SERVER_ERROR,
      message: errorDto.message,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }
}
