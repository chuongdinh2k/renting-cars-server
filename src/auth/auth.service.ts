import { Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { UserService } from '@modules/user/user.service';
import { LoginDto } from './dto/login.dto';
import { ExceptionFactory } from '@common/exceptions/exception-factory.exception';
import { ExceptionCodes } from '@common/exceptions/constants/exception-codes.enum';
import { comparePassword } from '@database/utils/password';
import {
  IGenerateTokenProps,
  JWTPayload,
} from './interfaces/generate-token-prop.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterCustomerDto): Promise<any> {
    return this.userService.create(registerDto);
  }
  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw ExceptionFactory.create(
        ExceptionCodes.BAD_REQUEST,
        `Your email or password is incorrect!`,
      );
    }
    const passwordVerified = await comparePassword(password, user.password);
    if (!passwordVerified) {
      throw ExceptionFactory.create(
        ExceptionCodes.BAD_REQUEST,
        `Your email or password is incorrect!`,
      );
    }
    const token = await this._generateToken({
      email: user.email,
    });
    return {
      data: user,
      token,
    };
  }

  async verifyUser(payload: JWTPayload): Promise<any> {
    const { email } = payload;
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw ExceptionFactory.create(ExceptionCodes.UNAUTHORIZED);
    }

    return user;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  private async _generateToken(
    generateToken: IGenerateTokenProps,
    exp?: any,
  ): Promise<string> {
    const { email } = generateToken;
    const defaultExpiresIn = process.env.JWT_EXPIRES || '20m';
    const expiresIn = exp || defaultExpiresIn;
    const user: JWTPayload = { email };
    const accessToken = this.jwtService.sign(user, { expiresIn: expiresIn });
    return accessToken;
  }
}
