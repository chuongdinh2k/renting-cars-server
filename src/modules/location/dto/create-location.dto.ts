import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty()
  @IsNotEmpty()
  location_name: string;

  @ApiProperty()
  @IsNotEmpty()
  street: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  state_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(7)
  zip_code: string;
}
