import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingEntity } from '@database/database/entity/billing.entity';
import { BookingModule } from '@modules/booking/booking.module';

@Module({
  imports: [TypeOrmModule.forFeature([BillingEntity]), BookingModule],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
