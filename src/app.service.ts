import { FileDbService } from './services/filedb.service';
import { SendEmailDto } from './dto/sendEmail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { unlink, writeFile } from 'fs/promises';

@Injectable()
export class AppService {
  constructor(
    private mailerService: MailerService,
    private mailDb: FileDbService,
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
}
