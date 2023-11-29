import { ExceptionCodes } from '@common/exceptions/constants/exception-codes.enum';
import { ExceptionFactory } from '@common/exceptions/exception-factory.exception';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, of } from 'rxjs';
import {
  CannotCreateEntityIdMapError,
  EntityNotFoundError,
  QueryFailedError,
} from 'typeorm';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  private readonly logger = new Logger('Exception');
  private getExceptionMessage(exception?: any): string {
    return exception?.message || JSON.stringify(exception) || String(exception);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      catchError((exception) => {
        console.log('exception', exception);
        this.logger.error(
          `{${request?.method}: ${request?.url}}: ${this.getExceptionMessage(
            exception,
          )}`,
        );
        switch (exception.constructor) {
          case HttpException:
            return exception;
          case QueryFailedError:
            throw ExceptionFactory.create(
              ExceptionCodes.INTERNAL_SERVER_ERROR,
              exception.message,
            );
          case EntityNotFoundError:
            throw ExceptionFactory.create(
              ExceptionCodes.INTERNAL_SERVER_ERROR,
              exception.message,
            );
          case CannotCreateEntityIdMapError:
            throw ExceptionFactory.create(
              ExceptionCodes.INTERNAL_SERVER_ERROR,
              exception.message,
            );
          default:
            throw exception;
        }
      }),
    );
  }
}
