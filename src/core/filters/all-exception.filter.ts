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
    const httpRequest = httpCtx.getRequest();
    let httpStatus = exception?.response?.statusCode;
    const messageError = exception?.response?.message ?? exception;

    const nameError = this.exceptionUtils.classifyError(exception);
    const bodyResponseError = this.exceptionUtils[nameError]({
      statusCode: httpStatus,
      message: messageError,
    });

    httpStatus = bodyResponseError.statusCode;
    if (bodyResponseError.statusCode) delete bodyResponseError.statusCode;
    bodyResponseError.requestId =
      httpRequest.headers?.['request-id'] ?? undefined;

    httpAdapter.reply(httpResponse, bodyResponseError, httpStatus);
  }
}
