
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus = HttpStatus.BAD_REQUEST
    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      message: 'Erro ao acessar o banco de dados. Certifique-se de fornecer ids válidos'
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
