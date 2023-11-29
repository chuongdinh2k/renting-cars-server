import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RentalInsuranceService } from './rental-insurance.service';
import { CreateRentalInsuranceDto } from './dto/create-rental-insurance.dto';
import { UpdateRentalInsuranceDto } from './dto/update-rental-insurance.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rental-insurance')
@Controller('rental-insurance')
export class RentalInsuranceController {
  constructor(
    private readonly rentalInsuranceService: RentalInsuranceService,
  ) {}

  @Post()
  create(@Body() createRentalInsuranceDto: CreateRentalInsuranceDto) {
    return this.rentalInsuranceService.create(createRentalInsuranceDto);
  }

  @Get()
  findAll() {
    return this.rentalInsuranceService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalInsuranceService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRentalInsuranceDto: UpdateRentalInsuranceDto,
  ) {
    return this.rentalInsuranceService.update(+id, updateRentalInsuranceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentalInsuranceService.remove(+id);
  }
}
