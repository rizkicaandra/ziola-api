// Base response
export interface ResponseBaseInterface {
  code: string;
  message: string;
}

// Response success
export interface ResponseSuccess<T> extends ResponseBaseInterface {
  data: T;
}

// Response error
export interface ResponseError extends ResponseBaseInterface {
  statusCode: number;
  requestId?: string;
}
