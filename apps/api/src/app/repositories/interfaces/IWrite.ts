export interface IWrite<T> {
  create(item: any): Promise<T>;
  update(id: string, fieldsToUpdate: any): Promise<boolean>;
  delete(id: string): Promise<number>;
}

export interface IInsertResult {
  success: boolean;
  id: string;
}
