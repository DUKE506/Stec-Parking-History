class ListBaseType {}

class ListError extends ListBaseType {}

class ListLoading extends ListBaseType {}

class ListType<T> extends ListBaseType {
  constructor(public meta: ListMeta, public data: T[] = []) {
    super();
  }
}

class ListMeta {
  constructor(
    public totalItemCount: number = 0,
    public pageSize: number = 10,
    public activePage: number = 1
  ) {}
}
