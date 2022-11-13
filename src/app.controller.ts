import { ISendMailOptions } from '@nestjs-modules/mailer';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('API')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  hey() {
    return 'here';
  }

  @Post('sendMail')
  async sendMail(@Body() sendMailOptions: ISendMailOptions): Promise<string> {
    console.log('HI there');
    const sendresult = await this.appService.sendMail(sendMailOptions);
    console.log('sendresult', sendresult);
    return 'slicer';
  }
}
