import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '@database/database/entity/car_category.entity';
import { BaseEntity, FindOptionsWhere, Repository } from 'typeorm';
import { ExceptionFactory } from '@common/exceptions/exception-factory.exception';
import { ExceptionCodes } from '@common/exceptions/constants/exception-codes.enum';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const {
      name,
      number_of_luggages,
      cost_per_day,
      late_fee_per_hour,
      number_of_person,
    } = createCategoryDto;
    const category = await this.findOne({ name });
    if (category) {
      throw ExceptionFactory.create(
        ExceptionCodes.BAD_REQUEST,
        `Category with name ${name} is exist`,
      );
    }
    return this.categoryRepo.save({
      name,
      number_of_luggages,
      number_of_person,
      late_fee_per_hour,
      cost_per_day,
    });
  }

  async findAndCountBy(where: FindOptionsWhere<BaseEntity>) {
    const data = await this.categoryRepo.findAndCountBy(where);
    return {
      data: data[0],
      total: data[1],
    };
  }

  async findAll(options: object) {
    return this.findAndCountBy(options);
  }

  async findOne(options: object) {
    return this.categoryRepo.findOneBy(options);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
