import {
  BadRequestException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ExceptionCodes } from './constants/exception-codes.enum';
import { ExceptionMessages } from './constants/exception-messages';
import { UnknownException } from './unknonw.exception';

export class ExceptionFactory {
  static create(code: ExceptionCodes, message?: string): HttpException {
    let exception: HttpException;
    switch (code) {
      case ExceptionCodes.ENTITY_NOT_FOUND:
        exception = new NotFoundException(
          message || ExceptionMessages.DATABASE.DOCUMENT_NOT_FOUND,
        );
        break;
      case ExceptionCodes.USER_NOT_FOUND:
        exception = new NotFoundException(
          message || ExceptionMessages.USER.NOT_FOUND,
        );
        break;
      case ExceptionCodes.POST_NOT_FOUND:
        exception = new NotFoundException(
          message || ExceptionMessages.POST.NOT_FOUND,
        );
        break;
      case ExceptionCodes.BAD_REQUEST:
        exception = new BadRequestException(
          message || ExceptionMessages.BAD_REQUEST,
        );
        break;
      case ExceptionCodes.UNAUTHORIZED:
        exception = new UnauthorizedException(
          message || ExceptionMessages.UNAUTHORIZED,
        );
        break;
      case ExceptionCodes.UNPROCESSABLE_ENTITY:
        exception = new BadRequestException(message || 'Can not access entity');
        break;
      case ExceptionCodes.INTERNAL_SERVER_ERROR:
        exception = new InternalServerErrorException(
          message || 'Internal Server Error',
        );
        break;
      default:
        exception = new UnknownException(message || ExceptionMessages.UNKNOWN);
        break;
    }
    return exception;
  }
}
