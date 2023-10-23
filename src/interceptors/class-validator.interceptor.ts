import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error.name === 'ValidationError') {
          const validationErrors = [];
          for (const field in error.errors) {
            if (error.errors.hasOwnProperty(field)) {
              validationErrors.push({
                field,
                message: error.errors[field].message,
              });
            }
          }
          return throwError(
            new BadRequestException({
              status: HttpStatus.BAD_REQUEST,
              error: 'Validation failed',
              validationErrors,
            }),
          );
        }

        return throwError(error);
      }),
    );
  }
}
