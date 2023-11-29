import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from '@database/database/entity/car.entity';
import { CategoryModule } from '@modules/category/category.module';
import { CarLocationEntity } from '@database/database/entity/car_location.entity';
import { LocationModule } from '@modules/location/location.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarEntity, CarLocationEntity]),
    CategoryModule,
    LocationModule,
  ],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService],
})
export class CarModule {}
