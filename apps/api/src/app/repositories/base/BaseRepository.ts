import { Model } from "mongoose";
import { IRead, IWrite, QueryFilterOptions } from "../interfaces";

export abstract class BaseRepository<T, U> implements IRead<T, U>, IWrite<T> {
  public readonly _model: Model<T>;

  constructor(model) {
    this._model = model;
  }

  abstract find(filter: any, opts?: QueryFilterOptions): Promise<T[] | U[]>;
  abstract findById(id: string): Promise<T | null>;
  abstract findOne(filter: any): Promise<T | U | null>;
  abstract create(item: any): Promise<T>;
  abstract update(id: string, item: T): Promise<boolean>;
  abstract delete(id: string): Promise<number>;
}
