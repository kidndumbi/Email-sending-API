import { CreateTemplateDto } from 'src/dto/createTemplate.dto';
import { EmailTemplateModel } from 'src/models/emailTemplateData.model';

export class ITemplate {
  getAllTemplates: () => Promise<EmailTemplateModel[]>;
  getSingleTemplate: (id: string) => Promise<EmailTemplateModel | null>;
  createNewTemplate: (
    createTemplateDto: CreateTemplateDto,
  ) => Promise<EmailTemplateModel | null>;
  deleteTemplate: (id: string) => Promise<any>;
}
