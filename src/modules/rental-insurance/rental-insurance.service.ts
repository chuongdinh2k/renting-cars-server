import { Injectable } from '@nestjs/common';
import { CreateRentalInsuranceDto } from './dto/create-rental-insurance.dto';
import { UpdateRentalInsuranceDto } from './dto/update-rental-insurance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RentalInsuranceEntity } from '@database/database/entity/rental_insurance.entity';
import { BaseEntity, FindOptionsWhere, Repository } from 'typeorm';
import { ExceptionFactory } from '@common/exceptions/exception-factory.exception';
import { ExceptionCodes } from '@common/exceptions/constants/exception-codes.enum';

@Injectable()
export class RentalInsuranceService {
  constructor(
    @InjectRepository(RentalInsuranceEntity)
    private readonly rentalInsuranceRepo: Repository<RentalInsuranceEntity>,
  ) {}

  async create(createRentalInsuranceDto: CreateRentalInsuranceDto) {
    const { name, coverage_type, cost_per_day } = createRentalInsuranceDto;
    const insurance = await this.findOne({ name });
    if (insurance) {
      throw ExceptionFactory.create(
        ExceptionCodes.BAD_REQUEST,
        `Insurance with name ${name} is exist`,
      );
    }
    return this.rentalInsuranceRepo.save({
      name,
      coverage_type,
      cost_per_day,
    });
  }

  async findAndCountBy(where: FindOptionsWhere<BaseEntity>) {
    const data = await this.rentalInsuranceRepo.findAndCountBy(where);
    return {
      data: data[0],
      total: data[1],
    };
  }

  async findAll(options: object) {
    return this.findAndCountBy(options);
  }

  async findInsuranceById(id: number): Promise<any> {
    const insurance = await this.findOne({ id });
    if (!insurance) {
      throw ExceptionFactory.create(
        ExceptionCodes.ENTITY_NOT_FOUND,
        `Insurance with id ${id} is not found`,
      );
    }
    return insurance;
  }

  async findOne(options: object): Promise<any> {
    return this.rentalInsuranceRepo.findOneBy(options);
  }

  update(id: number, updateRentalInsuranceDto: UpdateRentalInsuranceDto) {
    return `This action updates a #${id} rentalInsurance`;
  }

  remove(id: number) {
    return `This action removes a #${id} rentalInsurance`;
  }
}
