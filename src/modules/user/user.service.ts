import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExceptionFactory } from '@common/exceptions/exception-factory.exception';
import { ExceptionCodes } from '@common/exceptions/constants/exception-codes.enum';
import { hashPassword } from '@database/utils/password';
import { UserEntity } from '@database/database/entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const {
      email,
      password,
      first_name,
      last_name,
      city,
      phone,
      street,
      driver_license,
      state_name,
    } = createUserDto;

    const user = await this.findOne({ email });

    if (user) {
      throw ExceptionFactory.create(
        ExceptionCodes.BAD_REQUEST,
        'User with email is exist',
      );
    }

    const hashedPassword = await hashPassword(password);

    return this.userEntity.save({
      password: hashedPassword,
      email,
      first_name,
      last_name,
      city,
      phone,
      street,
      driver_license,
      state_name,
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(options: object) {
    return this.userEntity.findOneBy(options);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
