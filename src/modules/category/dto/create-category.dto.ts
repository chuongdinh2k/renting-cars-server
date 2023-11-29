import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(17)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(2)
  @Max(20)
  number_of_person: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100000)
  cost_per_day: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0.1)
  @Max(100000)
  late_fee_per_hour: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(20)
  number_of_luggages: number;
}
