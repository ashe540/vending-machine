export interface IRead<T, U> {
  find(filter: any): Promise<T[] | U[]>;
  findOne(id: string): Promise<T | U | null>;
}

export interface ListQueryOptions {
  page: number;
  limit: number;
  userId?: string;
}

export interface QueryFilterOptions {
  lean?: boolean;
  listOptions?: ListQueryOptions;
}
