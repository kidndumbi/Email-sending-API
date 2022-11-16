import { MongooseModule } from '@nestjs/mongoose';
import { MongoDbService } from './mongodb.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import {
  EmailTemplate,
  EmailTemplateSchema,
} from './schemas/emailTemplate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailTemplate.name, schema: EmailTemplateSchema },
    ]),
  ],
  controllers: [],
  providers: [MongoDbService],
  exports: [MongoDbService],
})
export class MongoDbModule {}
