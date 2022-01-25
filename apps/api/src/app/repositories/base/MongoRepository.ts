import { Model, Types } from "mongoose";
import { QueryFilterOptions } from "../interfaces";
import { BaseRepository } from "./BaseRepository";

const { ObjectId } = Types;

export class MongoRepository<T, U> implements BaseRepository<T, U> {
  public readonly _model: Model<T>;

  constructor(model) {
    this._model = model;
  }

  async find(filter: any, opts: QueryFilterOptions): Promise<T[] | U[]> {
    let query = this._model.find(filter);
    const { listOptions } = opts;

    if (opts.lean) {
      query = query.lean();
    }

    if (listOptions?.page && listOptions?.limit) {
      query = query.skip(listOptions.page * listOptions.limit);
      query = query.limit(listOptions.limit);
    }

    return query.exec();
  }

  async findById(id: string): Promise<T | null> {
    // Check if ID is valid format
    const isValid = this.isValidObjectId(id);

    if (!isValid) {
      throw Error("Invalid Object ID was provided");
    }

    return this._model.findOne({ _id: new ObjectId(id) });
  }

  async findByIds(ids: string[]): Promise<T[] | []> {
    const validIds = ids.every(this.isValidObjectId);

    if (!validIds) {
      throw Error("Invalid Object ID was provided");
    }

    return this._model.find({
      _id: { $in: ids.map((id) => new ObjectId(id)) },
    });
  }

  async findOne(filter: any, lean = false): Promise<T | U | null> {
    let query = this._model.findOne(filter);
    if (lean) {
      query = query.lean();
    }
    return query;
  }

  async count(filter: any): Promise<number> {
    return this._model.countDocuments(filter);
  }

  async create(item: any): Promise<T> {
    return this._model.create(item);
  }

  async update(id: string, update: any): Promise<boolean> {
    const result = await this._model.updateOne(
      { _id: new ObjectId(id) },
      update
    );
    return result.acknowledged;
  }

  async delete(id: string): Promise<number> {
    const result = await this._model.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
  }

  isValidObjectId(id) {
    if (ObjectId.isValid(id)) {
      if (String(new ObjectId(id)) === id) return true;
      return false;
    }
    return false;
  }
}
