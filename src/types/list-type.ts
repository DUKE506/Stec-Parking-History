
class ListBaseType { }

class ListError extends ListBaseType { }

class ListLoading extends ListBaseType { }


class ListType<T> extends ListBaseType {
    meta: object = {};
    data: T[] = [];
}