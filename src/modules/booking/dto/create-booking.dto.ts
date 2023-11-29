import { MinDate } from '@common/decorators/custom-min-date.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  @MinDate(new Date())
  from_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  @MinDate(new Date())
  return_date: Date;

  @ApiProperty()
  @IsOptional()
  discount_codes: string;

  @ApiProperty()
  @IsOptional()
  @Min(1)
  insurance_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  pickup_loc_id: number;

  @ApiProperty()
  @IsOptional()
  @Min(1)
  return_loc_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  car_id: number;
}
