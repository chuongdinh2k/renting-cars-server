import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntity, FindOptionsWhere, Repository } from 'typeorm';
import { ExceptionFactory } from '@common/exceptions/exception-factory.exception';
import { ExceptionCodes } from '@common/exceptions/constants/exception-codes.enum';
import { DiscountEntity } from '@database/database/entity/discount.entity';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(DiscountEntity)
    private readonly discountRepo: Repository<DiscountEntity>,
  ) {}

  async create(createDiscountDto: CreateDiscountDto): Promise<any> {
    const { name, codes, expiry_date, percentage } = createDiscountDto;
    const discount = await this.findOne({ codes });

    if (discount) {
      throw ExceptionFactory.create(
        ExceptionCodes.BAD_REQUEST,
        `Discount with codes ${codes} is exist`,
      );
    }

    return this.discountRepo.save({
      name,
      codes,
      expiry_date,
      percentage,
    });
  }

  async findAndCountBy(where: FindOptionsWhere<BaseEntity>) {
    const data = await this.discountRepo.findAndCountBy(where);
    return {
      data: data[0],
      total: data[1],
    };
  }

  async findAll(options: object) {
    return this.findAndCountBy(options);
  }
  async findDiscountByCode(codes: string) {
    const discount = await this.findOne({ codes });
    if (!discount) {
      throw ExceptionFactory.create(
        ExceptionCodes.ENTITY_NOT_FOUND,
        `Discount with codes ${codes} is not found `,
      );
    }
    return discount;
  }

  async findOne(options: object) {
    return this.discountRepo.findOneBy(options);
  }

  async update(codes: string, updateDiscountDto: UpdateDiscountDto) {
    const { percentage, expiry_date } = updateDiscountDto;
    const discount = await this.findDiscountByCode(codes);
    discount.percentage = percentage ?? discount.percentage;
    discount.expiry_date = expiry_date ?? discount.expiry_date;
    return this.discountRepo.save(discount);
  }

  remove(id: number) {
    return `This action removes a #${id} discount`;
  }
}
