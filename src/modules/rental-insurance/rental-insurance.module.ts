import { Module } from '@nestjs/common';
import { RentalInsuranceService } from './rental-insurance.service';
import { RentalInsuranceController } from './rental-insurance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalInsuranceEntity } from '@database/database/entity/rental_insurance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RentalInsuranceEntity])],
  controllers: [RentalInsuranceController],
  providers: [RentalInsuranceService],
  exports: [RentalInsuranceService],
})
export class RentalInsuranceModule {}
