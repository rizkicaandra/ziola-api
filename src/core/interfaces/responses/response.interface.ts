// Base response
export interface ResponseBaseInterface {
  code: number;
  status: string;
}

// Response success
export interface ResponseSuccess<T> extends ResponseBaseInterface {
  data: T;
}

// Response detail error
export interface ResponseErrorDetail {
  code: string;
  message: string;
}

// Response error
export interface ResponseError extends ResponseBaseInterface {
  errors?: ResponseErrorDetail[];
  error?: ResponseErrorDetail;
}
