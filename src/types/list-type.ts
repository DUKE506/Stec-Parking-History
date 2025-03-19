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
  totalItemCount: number;
  pageSize: number;
  activePage: number;
  constructor({
    totalItemCount,
    pageSize,
    activePage,
  }: {
    totalItemCount: number;
    pageSize: number;
    activePage: number;
  }) {
    (this.totalItemCount = totalItemCount),
      (this.pageSize = pageSize),
      (this.activePage = activePage);
  }
}
