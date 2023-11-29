import { EBillStatus } from '@common/interfaces/bill.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateBillingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(EBillStatus)
  status: EBillStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  tax_amt: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  booking_id: number;
}
