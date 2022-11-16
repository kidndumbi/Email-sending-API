import { SendEmailDto } from './dto/sendEmail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { unlink, writeFile } from 'fs/promises';
import { CreateTemplateDto } from './dto/createTemplate.dto';
import { EmailTemplateModel } from './models/emailTemplateData.model';
import { MongoDbService } from './DB/mongoDB/mongodb.service';

@Injectable()
export class AppService {
  constructor(
    private mailerService: MailerService,
    private mailDb: MongoDbService,
  ) {}

  async sendMail(sendEmailDto: SendEmailDto) {
    try {
      const singleTemplatedata = await this.mailDb.getSingleTemplate(
        sendEmailDto.templateId,
      );

      const fileName = `${singleTemplatedata.templateId}.hbs`;
      const filePath = __dirname + '/./templates/' + fileName;

      await writeFile(filePath, singleTemplatedata.content);

      await this.mailerService.sendMail({
        ...sendEmailDto.sendMailOptions,
        template: './' + fileName,
      });

      await unlink(filePath);
    } catch (error) {
      console.log('error:::::: ', error);
    }
  }

  async createTemplate(
    createTemplateDto: CreateTemplateDto,
  ): Promise<EmailTemplateModel> {
    const template = await this.mailDb.createNewTemplate(createTemplateDto);
    return template;
  }

  async deleteTemplate(templateId: string) {
    return await this.mailDb.deleteTemplate(templateId);
  }
}
