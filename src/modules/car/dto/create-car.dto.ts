import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCarDto {
  @ApiProperty()
  @IsNotEmpty()
  model_name: string;

  @ApiProperty()
  @IsNotEmpty()
  make: string;

  @ApiProperty()
  @IsNotEmpty()
  model_year: string;

  @ApiProperty()
  @IsNumber()
  category_id: number;
}
