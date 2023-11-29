import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { IGetUserAuthInfoRequest } from '@auth/interfaces/generate-token-prop.interface';

@ApiTags('Booking')
@ApiBearerAuth()
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() request: IGetUserAuthInfoRequest,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    const { user } = request;
    return this.bookingService.create(user.id, createBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bookingService.findBookingById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
