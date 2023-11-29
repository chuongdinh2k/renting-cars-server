import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CarEntity } from '@database/database/entity/car.entity';
import { BaseEntity, FindOptionsWhere, In, Repository } from 'typeorm';
import { CategoryService } from '@modules/category/category.service';
import { ExceptionFactory } from '@common/exceptions/exception-factory.exception';
import { ExceptionCodes } from '@common/exceptions/constants/exception-codes.enum';
import { CarLocationEntity } from '@database/database/entity/car_location.entity';
import { AddCarToLocationDto } from './dto/add-car-to-location.dto';
import { LocationService } from '@modules/location/location.service';
import { UpdateAvailableCarDto } from './dto/remove-car-in-location.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepo: Repository<CarEntity>,
    @InjectRepository(CarLocationEntity)
    private readonly carLocationRepo: Repository<CarLocationEntity>,
    private readonly categoryService: CategoryService,
    private readonly locationService: LocationService,
  ) {}
  // add a new car
  async create(createCarDto: CreateCarDto) {
    const { model_name, make, model_year, category_id } = createCarDto;
    const category = await this.categoryService.findOne({ id: category_id });
    if (!category)
      throw ExceptionFactory.create(
        ExceptionCodes.ENTITY_NOT_FOUND,
        `Category with ID ${category_id} is not found`,
      );
    const car = await this.findOne({ model_name });
    if (car) {
      throw ExceptionFactory.create(
        ExceptionCodes.BAD_REQUEST,
        `Car with name ${model_name} is exist`,
      );
    }
    return this.carRepo.save({
      model_name,
      make,
      model_year,
      category: category,
    });
  }

  // add car to location
  async addCarToLocation(
    addCarToLocationDto: AddCarToLocationDto,
    carId: number,
  ): Promise<any> {
    const { list_LocationIds, available_number } = addCarToLocationDto;
    console.log('available_number', available_number);
    const car = await this.findOne({ id: carId });
    if (!car) {
      throw ExceptionFactory.create(
        ExceptionCodes.ENTITY_NOT_FOUND,
        `Car with id ${carId} is not found`,
      );
    }

    const list_categories = await this.locationService.findAll({
      id: In(list_LocationIds),
    });
    return this.carLocationRepo.save(
      list_categories.data.map((item) => {
        return {
          location: item,
          car: car,
          available_number,
        };
      }),
    );
  }

  async findAndCountBy(where: FindOptionsWhere<BaseEntity>) {
    const data = await this.carRepo.findAndCountBy(where);
    return {
      data: data[0],
      total: data[1],
    };
  }

  async getCarWithLocation(carId: number) {
    const car = await this.findOne({ id: carId });
    if (!car) {
      throw ExceptionFactory.create(
        ExceptionCodes.ENTITY_NOT_FOUND,
        `Car with ID ${carId} is not found `,
      );
    }
    const result = await this.carLocationRepo.find({
      where: {
        car: { id: carId },
      },
      relations: ['car', 'location'],
    });
    if (!result.length) {
      return {
        car,
        locations: [],
      };
    }
    const locations = result.map((item) => {
      return {
        ...item.location,
        available_number: item.available_number,
      };
    });
    return {
      car: result[0].car,
      locations: locations,
    };
  }

  async updateCarLocationAvailable(
    carId: number,
    removeCarLocationDto: UpdateAvailableCarDto,
  ) {
    const { locationId } = removeCarLocationDto;
    const carLocations = await this.carLocationRepo.find({
      where: {
        car: { id: carId },
        location: { id: locationId },
      },
    });
    if (!carLocations.length) {
      throw ExceptionFactory.create(
        ExceptionCodes.BAD_REQUEST,
        `Incorrect car id or location id`,
      );
    }
    console.log('carLocations', carLocations);
  }

  findAll(options: object): Promise<any> {
    return this.findAndCountBy(options);
  }

  async findCarById(id: number) {
    const car = await this.findOne({ id });
    if (!car) {
      throw ExceptionFactory.create(
        ExceptionCodes.ENTITY_NOT_FOUND,
        'Car is not found',
      );
    }
    return car;
  }

  async findOne(options: object) {
    return this.carRepo.findOneBy(options);
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
