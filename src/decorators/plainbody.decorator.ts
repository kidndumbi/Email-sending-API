/*
https://docs.nestjs.com/openapi/decorators#decorators
https://stackoverflow.com/questions/52283713/how-do-i-pass-plain-text-as-my-request-body-using-nestjs
*/

import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import * as rawBody from 'raw-body';

export const PlainBody = createParamDecorator(
  async (_, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<import('express').Request>();
    if (!req.readable) {
      throw new BadRequestException('Invalid body');
    }

    const body = (await rawBody(req)).toString('utf8').trim();
    return body;
  },
);
