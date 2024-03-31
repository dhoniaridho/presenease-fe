export type ResponseSuccess<T> = {
  message: string;
  data: T;
};

export type ResponseError = {
  message: string;
  statusCode: number;
};
