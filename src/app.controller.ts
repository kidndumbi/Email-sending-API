import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTemplateDto } from './dto/createTemplate.dto';
import { SendEmailDto } from './dto/sendEmail.dto';
import { EmailTemplateModel } from './models/emailTemplateData.model';

@Controller('API')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  hey() {
    return 'here';
  }

  @Post('sendMail')
  async sendMail(@Body() sendEmailDto: SendEmailDto): Promise<string> {
    await this.appService.sendMail(sendEmailDto);
    return 'email sent';
  }

  // @Post('createTemplate')
  // async createTemplate(@Body() createTemplateDto: CreateTemplateDto) {
  //   console.log(createTemplateDto);
  //   return 'done';
  // }

  @Post('createTemplate')
  async createTemplate(
    @Body() createTemplateDto: CreateTemplateDto,
  ): Promise<EmailTemplateModel> {
    const emailTemplateData = await this.appService.createTemplate(
      createTemplateDto,
    );
    return emailTemplateData;
  }
}
