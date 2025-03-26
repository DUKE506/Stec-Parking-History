export class ListBaseType {}

export class ListError extends ListBaseType {}

export class ListLoading extends ListBaseType {}

export class ListModel<T> extends ListBaseType {
  meta: ListMeta;
  data: T[];

  constructor({ meta, data }: { meta: ListMeta; data: T[] }) {
    super();
    (this.meta = meta), (this.data = data);
  }
}

export class ListMeta {
  totalCount: number;
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  constructor({
    totalCount,
    pageSize,
    pageNumber,
    totalPages,
  }: {
    totalCount: number;
    pageSize: number;
    pageNumber: number;
    totalPages: number;
  }) {
    (this.totalCount = totalCount),
      (this.pageSize = pageSize),
      (this.pageNumber = pageNumber),
      (this.totalPages = totalPages);
  }
}
