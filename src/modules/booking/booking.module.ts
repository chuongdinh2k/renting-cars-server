import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from '@database/database/entity/booking.entity';
import { UserModule } from '@modules/user/user.module';
import { CarModule } from '@modules/car/car.module';
import { LocationModule } from '@modules/location/location.module';
import { DiscountModule } from '@modules/discount/discount.module';
import { RentalInsuranceModule } from '@modules/rental-insurance/rental-insurance.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingEntity]),
    UserModule,
    CarModule,
    LocationModule,
    DiscountModule,
    RentalInsuranceModule,
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
