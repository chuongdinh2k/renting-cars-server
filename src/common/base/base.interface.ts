import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult } from 'typeorm';

export interface IBaseService<T> {
  // comment
  //   index(): Promise<T[]>;

  //   findById(id: EntityId): Promise<T>;

  findOneBy(option: object): Promise<T>;

  //   store(data: any): Promise<T>;

  //   update(id: EntityId, data: any): Promise<T>;

  //   delete(id: EntityId): Promise<DeleteResult>;
}
