import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddCarToLocationDto } from './dto/add-car-to-location.dto';
import { UpdateAvailableCarDto } from './dto/remove-car-in-location.dto';

@ApiTags('car')
@ApiBearerAuth()
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Post(':id/addToLocation')
  async addCarToLocation(
    @Param('id') id: number,
    @Body() addCarToLocationDto: AddCarToLocationDto,
  ) {
    return this.carService.addCarToLocation(addCarToLocationDto, id);
  }

  @Patch(':id/updateCarInLocation')
  async removeCarInLocation(
    @Param('id') id: number,
    @Body() removeCarLocationDto: UpdateAvailableCarDto,
  ) {
    return this.carService.updateCarLocationAvailable(id, removeCarLocationDto);
  }

  @Get()
  findAll() {
    return this.carService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.carService.getCarWithLocation(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
