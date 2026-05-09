import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    // REST request
    const req = context.switchToHttp().getRequest();

    // If GraphQL request has no req object
    if (!req) {
      console.log('GraphQL Request');

      return next.handle().pipe(
        tap(() => console.log('GraphQL Response')),
      );
    }

    const { method, url } = req;

    console.log(`${method} ${url}`);

    return next.handle().pipe(
      tap(() => console.log('Request completed')),
    );
  }
}