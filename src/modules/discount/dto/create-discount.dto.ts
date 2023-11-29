import { MinDate } from '@common/decorators/custom-min-date.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, Min, MinLength } from 'class-validator';

export class CreateDiscountDto {
  @ApiProperty()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(5)
  codes: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  @MinDate(new Date())
  expiry_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @Min(0.5)
  percentage: number;
}
