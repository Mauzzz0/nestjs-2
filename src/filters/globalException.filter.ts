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

    // this.logger.error({
    //   message: GlobalExceptionFilter.validationPipeMessage,
    //   meta: error,
    // });
    // this.logger.error(
    //   (exception as HttpException).message,
    //   status === HttpStatus.INTERNAL_SERVER_ERROR ? (exception as HttpException).stack : undefined,
    // );

    response.status(data.status).json({
      status: data.status,
      title: data.title,
      message: data.message,
      meta: data.meta,
    });
  }

  private getResponseData(exception: unknown): ErrorObject {
    if (exception instanceof BadRequestException) {
      const meta = (exception?.getResponse() as any)?.message;
      return {
        status: exception.getStatus(),
        title: exception.name,
        message: exception.message,
        ...(meta !== exception.message ? { meta } : {}),
      };
    }

    if (exception instanceof HttpException) {
      return { status: exception.getStatus(), title: exception.name, message: exception.message };
    }

    return { status: 500, title: 'Internal Server Error', message: 'Unknown server error' };
  }
}
