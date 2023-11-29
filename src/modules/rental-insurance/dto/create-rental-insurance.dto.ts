import { ECoverageTypes } from '@common/interfaces/insurance.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, Min, MinLength } from 'class-validator';

export class CreateRentalInsuranceDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ECoverageTypes)
  coverage_type: ECoverageTypes;

  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  cost_per_day: number;
}
