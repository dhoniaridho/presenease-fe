export type PaginationType<T> = {
  data: T[];
  meta: { page: number; pageSize: number; totalData: number; totalPage: number };
};
