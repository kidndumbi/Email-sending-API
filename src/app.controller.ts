import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTemplateDto } from './dto/createTemplate.dto';
import { SendEmailDto } from './dto/sendEmail.dto';
import { UpdateTemplateDto } from './dto/updateTemplate.dto';
import { EmailTemplateModel } from './models/emailTemplateData.model';

@Controller('API')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  hey() {
    return 'here';
  }

  @Get('templates')
  getTemplates() {
    return this.appService.getTemplates();
  }

  @Post('sendMail')
  async sendMail(@Body() sendEmailDto: SendEmailDto): Promise<string> {
    await this.appService.sendMail(sendEmailDto);
    return 'email sent';
  }

  @Post('createTemplate')
  async createTemplate(
    @Body() createTemplateDto: CreateTemplateDto,
  ): Promise<EmailTemplateModel> {
    const emailTemplateData = await this.appService.createTemplate(
      createTemplateDto,
    );
    return emailTemplateData;
  }

  @Delete('deleteTemplate/:templateId')
  async deleteTemplate(@Param('templateId') templateId: string) {
    return this.appService.deleteTemplate(templateId);
  }

  @Patch('updateTemplate')
  async updateTemplate(@Body() updateTemplateDto: UpdateTemplateDto): Promise<EmailTemplateModel> {
      return this.appService.updateTemplate(updateTemplateDto)
  }
}
