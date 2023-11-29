import { Injectable } from '@nestjs/common';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BillingEntity } from '@database/database/entity/billing.entity';
import { Repository } from 'typeorm';
import { BookingService } from '@modules/booking/booking.service';
import dayjs from 'dayjs';
import { ExceptionFactory } from '@common/exceptions/exception-factory.exception';
import { ExceptionCodes } from '@common/exceptions/constants/exception-codes.enum';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(BillingEntity)
    private readonly billRepo: Repository<BillingEntity>,
    private readonly bookingService: BookingService,
  ) {}
  async create(createBillingDto: CreateBillingDto) {
    const { status, booking_id, tax_amt } = createBillingDto;
    // const booking = this.bookingService.updateBookingStatus(booking_id);
    await this.findBillingByBookingId(booking_id);

    const booking = await this.bookingService.findBookingById(booking_id);
    const { discount } = booking;
    const { return_date, from_date, car } = booking;
    const { late_fee_per_hour, cost_per_day } = car.category;

    const actual_rt_date = Date();

    const rental_duration = dayjs(return_date).diff(dayjs(from_date), 'days');
    const late_hours = dayjs(actual_rt_date).diff(dayjs(return_date), 'hours');

    const discount_percentage = discount ? discount.percentage : 0;
    const total_late_fee = late_hours > 0 ? late_hours * late_fee_per_hour : 0;
    const total_amt_without_tax =
      rental_duration * cost_per_day + total_late_fee;
    const discount_amount = (total_amt_without_tax * discount_percentage) / 100;

    const total_amt = total_amt_without_tax - discount_amount + tax_amt;

    return this.billRepo.save({
      discount_amount,
      total_amt,
      booking,
      status,
      tax_amt,
      total_late_fee,
    });
  }

  async findBillingByBookingId(booking_id: number): Promise<any> {
    const billing = await this.findOne({
      booking: { id: booking_id },
    });
    if (billing) {
      throw ExceptionFactory.create(
        ExceptionCodes.BAD_REQUEST,
        `Billing for booking id ${booking_id} is exist `,
      );
    }
  }

  findAll() {
    return `This action returns all billing`;
  }

  async findOne(options: object) {
    return this.billRepo.findOneBy(options);
  }

  update(id: number, updateBillingDto: UpdateBillingDto) {
    return `This action updates a #${id} billing`;
  }
}
