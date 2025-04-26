import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ExceptionUtils } from '../utils';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly exceptionUtils: ExceptionUtils,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const httpCtx = host.switchToHttp();
    const httpResponse = httpCtx.getResponse();
    const httpStatus = this.exceptionUtils.transformHttpStatus(exception);
    const messageError = exception?.response?.message ?? exception;

    const nameError = this.exceptionUtils.classifyError(exception);
    const bodyResponseError = this.exceptionUtils[nameError](
      httpStatus,
      messageError,
    );

    httpAdapter.reply(httpResponse, bodyResponseError, httpStatus);
  }
}
