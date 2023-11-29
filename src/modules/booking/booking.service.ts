import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from '@database/database/entity/booking.entity';
import { BaseEntity, FindOptionsWhere, Repository } from 'typeorm';
import { UserService } from '@modules/user/user.service';
import { LocationService } from '@modules/location/location.service';
import { CarService } from '@modules/car/car.service';
import { DiscountService } from '@modules/discount/discount.service';
import { isDateBefore } from '@database/utils/date';
import { ExceptionFactory } from '@common/exceptions/exception-factory.exception';
import { ExceptionCodes } from '@common/exceptions/constants/exception-codes.enum';
import { RentalInsuranceService } from '@modules/rental-insurance/rental-insurance.service';
import { EBookingStatus } from '@common/interfaces/booking.interface';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepo: Repository<BookingEntity>,
    private readonly useService: UserService,
    private readonly locationService: LocationService,
    private readonly carService: CarService,
    private readonly discountService: DiscountService,
    private readonly rentalService: RentalInsuranceService,
  ) {}

  async create(
    userId: number,
    createBookingDto: CreateBookingDto,
  ): Promise<any> {
    const {
      pickup_loc_id,
      from_date,
      return_date,
      discount_codes,
      insurance_id,
      return_loc_id,
      car_id,
    } = createBookingDto;
    const isFromDateBeforeReturnDate = isDateBefore(from_date, return_date);
    if (!isFromDateBeforeReturnDate) {
      throw ExceptionFactory.create(
        ExceptionCodes.BAD_REQUEST,
        `Pick up date should before return date`,
      );
    }
    const user = await this.useService.findOne({ id: userId });
    const car = await this.carService.findCarById(car_id);
    const pickupLocation = await this.locationService.findLocationById(
      pickup_loc_id,
    );
    const returnLocation = await this.locationService.findLocationById(
      return_loc_id,
    );
    let discount = null;
    if (discount_codes) {
      discount = await this.discountService.findDiscountByCode(discount_codes);
    }
    let rental_insurance = null;
    if (insurance_id) {
      rental_insurance = await this.rentalService.findInsuranceById(
        insurance_id,
      );
    }
    return this.bookingRepo.save({
      car,
      customer: user,
      pickup_loc: pickupLocation,
      drop_loc: returnLocation,
      from_date,
      return_date,
      discount: discount,
      rental_insurance,
    });
  }

  findAll(option: object) {
    return this.findAndCountBy({});
  }
  async findAndCountBy(where: FindOptionsWhere<BaseEntity>) {
    const data = await this.bookingRepo.findAndCountBy(where);
    return {
      data: data[0],
      total: data[1],
    };
  }

  async findBookingById(id: number): Promise<any> {
    const booking = await this.findOne({ id });
    if (!booking) {
      throw ExceptionFactory.create(
        ExceptionCodes.ENTITY_NOT_FOUND,
        `Booking ID ${id} is not found`,
      );
    }
    return booking;
  }

  async findOne(options: object) {
    return this.bookingRepo.findOneBy(options);
  }

  async updateBookingStatus(id: number) {
    const booking = await this.findBookingById(id);
    booking.status = EBookingStatus.DONE;
    await this.bookingRepo.save(booking);
    return booking;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  async remove(id: number) {
    const deletedBooking = await this.bookingRepo.softDelete(id);
    if (!deletedBooking.affected) {
      throw ExceptionFactory.create(
        ExceptionCodes.BAD_REQUEST,
        `Can not delete booking with ID ${id}`,
      );
    }
    return deletedBooking;
  }
}
