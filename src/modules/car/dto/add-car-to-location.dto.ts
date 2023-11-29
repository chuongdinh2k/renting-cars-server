import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';

export class AddCarToLocationDto {
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  list_LocationIds: number[];

  @ApiProperty()
  @IsNumber()
  @Min(1)
  available_number: number;
}
