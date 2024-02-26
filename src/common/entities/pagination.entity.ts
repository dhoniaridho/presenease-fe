export type CreatePaginationEntity<T> = {
  data: T;
  page: number;
  total: number;
  pageSize: number;
};

export const createPaginationEntity = <T>({
  data,
  page,
  total,
  pageSize,
}: CreatePaginationEntity<T>) => ({
  data,
  meta: {
    total,
    totalPage: Math.ceil(total / pageSize),
    page,
  },
});
