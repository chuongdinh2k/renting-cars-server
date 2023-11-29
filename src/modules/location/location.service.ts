import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from '@database/database/entity/location.entity';
import { BaseEntity, FindOptionsWhere, Repository } from 'typeorm';
import { ExceptionFactory } from '@common/exceptions/exception-factory.exception';
import { ExceptionCodes } from '@common/exceptions/constants/exception-codes.enum';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private locationEntity: Repository<LocationEntity>,
  ) {}
  async create(createLocationDto: CreateLocationDto): Promise<any> {
    const { location_name, street, city, state_name, zip_code } =
      createLocationDto;
    const location = await this.findOne({ location_name });
    if (location) {
      throw ExceptionFactory.create(
        ExceptionCodes.BAD_REQUEST,
        'Location is exist',
      );
    }
    return this.locationEntity.save({
      location_name,
      street,
      city,
      state_name,
      zip_code,
    });
  }

  async findAndCountBy(where: FindOptionsWhere<BaseEntity>) {
    const data = await this.locationEntity.findAndCountBy(where);
    return {
      data: data[0],
      total: data[1],
    };
  }

  async findAll(options: object) {
    return this.findAndCountBy(options);
  }

  async findLocationById(location_id: number): Promise<any> {
    const location = await this.locationEntity.findOneBy({ id: location_id });
    if (!location) {
      throw ExceptionFactory.create(
        ExceptionCodes.POST_NOT_FOUND,
        `Can not found location with id ${location_id}`,
      );
    }
    return location;
  }

  async findOne(options: object): Promise<any> {
    return this.locationEntity.findOneBy(options);
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const { state_name, city, street, zip_code, location_name } =
      updateLocationDto;
    let location = await this.findLocationById(id);
    location = {
      ...location,
      state_name: state_name ?? location.state_name,
      city: city ?? location.city,
      street: street ?? location.street,
      zip_code: zip_code ?? location.zip_code,
      location_name: location_name ?? location.location_name,
    };
    return this.locationEntity.save(location);
  }

  async remove(id: number) {
    const location = await this.findLocationById(id);
    return this.locationEntity.remove(location);
  }
}
