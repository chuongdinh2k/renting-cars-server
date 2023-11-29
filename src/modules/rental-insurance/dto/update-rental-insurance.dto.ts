import { PartialType } from '@nestjs/swagger';
import { CreateRentalInsuranceDto } from './create-rental-insurance.dto';

export class UpdateRentalInsuranceDto extends PartialType(CreateRentalInsuranceDto) {}
