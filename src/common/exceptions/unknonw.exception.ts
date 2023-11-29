import { HttpException } from '@nestjs/common';

export class UnknownException extends HttpException {
  constructor(response: string | Record<string, any>) {
    super(response, 520);
  }
}
