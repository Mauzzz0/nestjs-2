import { ArgumentsHost, BadRequestException, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Response } from 'express';

type ErrorObject = {
  status: number;
  title: string;
  message: string;
  meta?: Record<string, any> | Record<string, any>[] | string[];
};

export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();

    const data = this.getResponseData(exception);

    this.logger.error({
      status: data.status,
      title: data.title,
      message: data.message,
      meta: data.meta,
    });

    response.status(data.status).json({
      status: data.status,
      title: data.title,
      message: data.message,
      meta: data.meta,
    });
  }

  private getResponseData(exception: unknown): ErrorObject {
    // If this is Validation Error => safely return title and message, and try to include some validation details in meta property
    if (exception instanceof BadRequestException) {
      const meta = (exception?.getResponse() as any)?.message;
      return {
        status: exception.getStatus(),
        title: exception.name,
        message: exception.message,
        ...(meta !== exception.message ? { meta } : {}),
      };
    }

    // If this is Nest.JS built-in exception => safely return title and message
    if (exception instanceof HttpException) {
      return { status: exception.getStatus(), title: exception.name, message: exception.message };
    }

    // If this is not Nest.JS built-in exception => don't show error title or message due to security reasons.
    // Just send "500 Interval Server Error" without any details
    return { status: 500, title: 'Internal Server Error', message: 'Unknown server error' };
  }
}
