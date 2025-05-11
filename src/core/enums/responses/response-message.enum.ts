import { AppErrorCode } from './response-code.enum';

// Response Error Message
export const AppErrorMessage: { [key in AppErrorCode]: string } = {
  [AppErrorCode.INTERNAL_SERVER_ERROR]:
    'Oops something went wrong, please contact our support for more info',
  [AppErrorCode.PRISMA_ERROR]:
    'We apologize, but the data you entered appears to be invalid. Please double-check the input and try again',
  [AppErrorCode.HEADERS_INVALID]: 'Headers missing or invalid',
  [AppErrorCode.BAD_REQUEST]: 'Bad Request',
  [AppErrorCode.UNAUTHORIZED]: 'Unauthorized',
  [AppErrorCode.FORBIDDEN]: 'Forbidden',
  [AppErrorCode.NOT_FOUND]: 'The requested item could not be found',
  [AppErrorCode.VALIDATION_ERROR]: 'Validation error',
  [AppErrorCode.USER_STATUS_NOT_FOUND]: 'User status could not be found',
  [AppErrorCode.APPLICATION_NOT_FOUND]: 'Application item could not be found',
  [AppErrorCode.USER_MODULE_NOT_FOUND]: 'User module item could not be found',
  [AppErrorCode.USER_ROLE_NOT_FOUND]: 'User role item could not be found',
  [AppErrorCode.USER_ACCOUNT_NOT_FOUND]: 'User account could not be found',
  [AppErrorCode.USER_ACCOUNT_PASSWORD_MUST_BE_DIFFERENT_WITH_NEW_ONE]:
    'New password must be different from the current password',
  [AppErrorCode.USER_ACCOUNT_CURRENT_PASSWORD_NOT_MATCH]:
    'Current password does not match',
};
