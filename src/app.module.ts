import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { LocationModule } from './modules/location/location.module';
import { CarModule } from './modules/car/car.module';
import { CategoryModule } from './modules/category/category.module';
import { BillingModule } from './modules/billing/billing.module';
import { BookingModule } from './modules/booking/booking.module';
import { DiscountModule } from './modules/discount/discount.module';
import { RentalInsuranceModule } from './modules/rental-insurance/rental-insurance.module';
import typeorm from '@database/database/config.database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@database/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    LocationModule,
    CarModule,
    CategoryModule,
    BillingModule,
    BookingModule,
    DiscountModule,
    RentalInsuranceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
