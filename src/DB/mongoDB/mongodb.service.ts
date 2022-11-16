import {
  EmailTemplateDocument,
  EmailTemplate,
} from './schemas/emailTemplate.schema';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ITemplate } from 'src/interface/ITemplate.interface';
import { CreateTemplateDto } from 'src/dto/createTemplate.dto';
import { EmailTemplateModel } from 'src/models/emailTemplateData.model';

@Injectable()
export class MongoDbService implements ITemplate {
  constructor(
    @InjectModel(EmailTemplate.name)
    private emailTemplatelModel: Model<EmailTemplateDocument>,
  ) {}

  getAllTemplates(): Promise<EmailTemplateModel[]> {
    try {
      return this.emailTemplatelModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getSingleTemplate(templateId: string): Promise<EmailTemplateModel> {
    try {
      return this.emailTemplatelModel.findById(templateId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createNewTemplate(
    createTemplateDto: CreateTemplateDto,
  ): Promise<EmailTemplateModel> {
    try {
      const newEmailTemplate = new this.emailTemplatelModel(createTemplateDto);
      return await newEmailTemplate.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  deleteTemplate(templateId: string): Promise<any> {
    return this.emailTemplatelModel.findByIdAndRemove(templateId).exec();
  }
}
