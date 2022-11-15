import { FileDbService } from './services/filedb.service';
import { SendEmailDto } from './dto/sendEmail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/createTemplate.dto';

@Injectable()
export class AppService {
  constructor(
    private mailerService: MailerService,
    private mailDb: FileDbService,
  ) {}

  async sendMail(sendEmailDto: SendEmailDto) {
    try {
      const { filePath } = await this.mailDb.getSingleTemplate(
        sendEmailDto.templateId,
      );
      await this.mailerService.sendMail({
        ...sendEmailDto.sendMailOptions,
        template: filePath,
      });
    } catch (error) {
      console.log('error:::::: ', error);
    }
  }

  // async createTemplate(createTemplateDto: CreateTemplateDto) {
  //   const emailTemplateData = await this.mailDb.createNewTemplate(
  //     createTemplateDto,
  //   );
  //   return emailTemplateData;
  // }
}
