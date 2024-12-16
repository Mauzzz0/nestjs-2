import { ArgumentsHost, Catch, ExceptionFilter as IExceptionFilter } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch(Error)
export class ExceptionFilter implements IExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = error?.getStatus() || 500;

    response.status(status).send({
      statusCode: status,
      message: error?.message ?? 'Internal Server Error',
    });
  }
}
