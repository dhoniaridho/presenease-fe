interface ResponseEntity<T = any> {
  code: number;
  message: string;
  data: T;
}

export const createResponseEntity = <T>(
  code: number,
  message: string,
  data: T
): ResponseEntity<T> => ({
  code,
  message,
  data,
});
