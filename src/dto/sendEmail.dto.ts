import { ISendMailOptions } from '@nestjs-modules/mailer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDto {
  @IsString()
  @IsNotEmpty()
  public templateId: string;
  @IsNotEmpty()
  public sendMailOptions: ISendMailOptions;
}
