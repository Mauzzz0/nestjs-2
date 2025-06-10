import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface JsonApiSerializerOptions {
  message?: string;
  meta?: Record<string, any>;
  status?: HttpStatus;
}

@Injectable()
export class JsonApiSerializerInterceptor implements NestInterceptor {
  private static optionsSymbol = Symbol('JsonApiSerializerOptions');

  intercept(context: ExecutionContext, next: CallHandler): Observable<Record<string, any>> {
    return next.handle().pipe(
      map((res) => {
        const options = JsonApiSerializerInterceptor.getOptions(context);
        const status: HttpStatus = options?.status ?? HttpStatus.OK;
        if (status !== HttpStatus.OK) {
          const res = context.switchToHttp().getResponse<Response>();
          res.status(status);
          if (status === HttpStatus.NO_CONTENT) {
            return {};
          }
        }
        return this.serialize(res, options);
      }),
    );
  }

  private serialize(response: any, options?: JsonApiSerializerOptions) {
    const message = options?.message || 'Success';
    const meta: Record<string, any> | undefined = options?.meta;
    let data: any = null;

    if (response === null) {
      return { message, meta, data: null };
    }

    if (Array.isArray(response) && response.length === 0) {
      return { message, meta, data: [] };
    }

    if (typeof response !== 'object') {
      throw new InternalServerErrorException('JsonApiSerializerInterceptor response format Error');
    }

    const isToJson = typeof (response?.[0] || response)?.toJSON === 'function';

    if (Array.isArray(response)) {
      data = isToJson ? response.map((item) => item.toJSON()) : response;
    } else {
      data = isToJson ? response.toJSON() : response;
    }

    return { message, meta, data };
  }

  public static setOptions(req: Request, options: JsonApiSerializerOptions): void {
    (req as any)[JsonApiSerializerInterceptor.optionsSymbol] = { ...options };
  }

  protected static getOptions(context: ExecutionContext): JsonApiSerializerOptions {
    const request = context.switchToHttp().getRequest();
    return request[JsonApiSerializerInterceptor.optionsSymbol];
  }
}
