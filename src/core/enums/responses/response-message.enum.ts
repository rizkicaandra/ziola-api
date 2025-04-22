import { AppErrorCode } from './response-code.enum';

// Response Error Message
export const AppErrorMessage: { [key in AppErrorCode]: string } = {
  [AppErrorCode.INTERNAL_SERVER_ERROR]: 'Oops something went wrong, please contact our support for more info.',
  [AppErrorCode.PRISMA_ERROR]:
    'We apologize, but the data you entered appears to be invalid. Please double-check the input and try again.',
  [AppErrorCode.BAD_REQUEST]: 'Bad Request.',
  [AppErrorCode.UNAUTHORIZED]: 'Unauthorized.',
  [AppErrorCode.FORBIDDEN]: 'Forbidden',
  [AppErrorCode.NOT_FOUND]: 'Sorry, the requested item could not be found.',
  [AppErrorCode.HEADERS_INVALID]: 'Headers missing or invalid.',
};
