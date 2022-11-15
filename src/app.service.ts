import { FileDbService } from './services/filedb.service';
import { SendEmailDto } from './dto/sendEmail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { DownloaderHelperWrapper } from './utils/download-helper-wrapper';
import { unlink } from 'fs/promises';

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

      const createdFileData = await new DownloaderHelperWrapper(
        singleTemplatedata.url,
        __dirname + '/./templates/',
      ).download();

      await this.mailerService.sendMail({
        ...sendEmailDto.sendMailOptions,
        template: './' + createdFileData.fileName,
      });

      await unlink(createdFileData.filePath);
    } catch (error) {
      console.log('error:::::: ', error);
    }
  }
}
