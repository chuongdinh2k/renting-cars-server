import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateAvailableCarDto {
  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  locationId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  number_car: number;
}
