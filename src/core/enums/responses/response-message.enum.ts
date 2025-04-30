import { AppErrorCode } from './response-code.enum';

// Response Error Message
export const AppErrorMessage: { [key in AppErrorCode]: string } = {
  [AppErrorCode.INTERNAL_SERVER_ERROR]:
    'Oops something went wrong, please contact our support for more info',
  [AppErrorCode.PRISMA_ERROR]:
    'We apologize, but the data you entered appears to be invalid. Please double-check the input and try again',
  [AppErrorCode.HEADERS_INVALID]: 'Headers missing or invalid',
  [AppErrorCode.VALIDATION_ERROR]: 'Validation error',
  [AppErrorCode.USER_STATUS_NOT_FOUND]: 'user status could not be found',
  [AppErrorCode.APPLICATION_NOT_FOUND]: 'application item could not be found',
  [AppErrorCode.USER_MODULE_NOT_FOUND]: 'user module item could not be found',
};
