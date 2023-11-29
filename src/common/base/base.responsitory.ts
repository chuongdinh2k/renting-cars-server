import { BaseEntity, FindOptionsWhere, Repository } from 'typeorm';
import { IBaseService } from './base.interface';
import { LoggerService } from '@nestjs/common';

export class BaseRepo<T extends BaseEntity, R extends Repository<T>>
  implements IBaseService<T>
{
  protected readonly repository: R;
  protected readonly logger: LoggerService;
  constructor(repository: R) {
    this.repository = repository;
  }

  async findAndCountBy(where: FindOptionsWhere<T>) {
    const data = await this.repository.findAndCountBy(where);
    return {
      data: data[0],
      total: data[1],
    };
  }
  findOneBy(object: object): Promise<T> {
    return this.repository.findOneBy(object);
  }

  async store(data: T | any): Promise<T> {
    return this.repository.save(data);
  }
}
