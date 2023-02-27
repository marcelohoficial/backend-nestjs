import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestResponse } from './nest-response';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<any> {
    return next.handle().pipe(
      map((response: NestResponse) => {
        if (response instanceof NestResponse) {
          const ctx = context.switchToHttp();
          const res = ctx.getResponse();
          const { status, headers, body } = response;

          const headersName = Object.getOwnPropertyNames(headers);
          headersName.forEach((name) => {
            const value = headers[name];
            this.httpAdapter.setHeader(res, name, value);
          });

          this.httpAdapter.status(res, status);

          return body;
        }

        return response;
      }),
    );
  }
}
