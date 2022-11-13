import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private mailerService: MailerService) {}

  async sendMail(sendMailOptions: ISendMailOptions) {
    try {
      await this.mailerService.sendMail(sendMailOptions);
    } catch (error) {
      console.log('error:::::: ', error);
    }
  }
}
