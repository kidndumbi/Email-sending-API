import { ITemplate } from './../interface/ITemplate.interface';
import { readFile } from 'fs/promises';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { EmailTemplateModel } from 'src/models/emailTemplateData.model';
import { CreateTemplateDto } from 'src/dto/createTemplate.dto';

@Injectable()
export class FileDbService implements ITemplate {
  async getAllTemplates(): Promise<EmailTemplateModel[]> {
    try {
      return this.getFileJson();
    } catch (error) {
      console.log(error);
    }
  }

  async getSingleTemplate(id: string): Promise<EmailTemplateModel | null> {
    try {
      const fileData = await this.getFileJson();
      const singleTemplateData = fileData.find(
        (data) => data.templateId === id,
      );
      return singleTemplateData;
    } catch (error) {
      console.log(error);
    }
  }

  createNewTemplate(
    createTemplateDto: CreateTemplateDto,
  ): Promise<EmailTemplateModel | null> {
    return Promise.resolve({
      templateId: 'slskjdlsdjlskdSomethingWung',
      description: 'template for goals status email',
      url: 'https://res.cloudinary.com/cassavacloudinary/raw/upload/v1668485889/email-templates/confirmation.hbs',
      name: 'goals notification',
    });
  }

  deleteTemplate(id: string) {
    return Promise.resolve();
  }

  private async getFileJson() {
    try {
      const file = await readFile(
        __dirname + '/../DB/fileDb/templateData.json',
      );
      return JSON.parse(file.toString()) as EmailTemplateModel[];
    } catch (error) {
      console.log(error);
    }
  }

  //   private async createFile(fileName: string) {
  //     try {
  //       console.log('__dirname ', __dirname);
  //       //await writeFile(__dirname + '/../templates/' + 'testfile.txt', 'cookies');
  //       const file = await readFile(
  //         __dirname + '/../templates/' + 'testfile.txt',
  //       );
  //       console.log(__dirname + '/../templates/' + 'testfile.txt');
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
}
