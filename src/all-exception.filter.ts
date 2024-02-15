
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    let message = 'Internal server error'

    if (exception instanceof PrismaClientKnownRequestError) {
      message = 'Erro ao acessar o banco de dados. Certifique-se de fornecer ids válidos'
    }

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.BAD_REQUEST;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      message,
    };


    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
