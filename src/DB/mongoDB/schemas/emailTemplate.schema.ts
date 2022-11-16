import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmailTemplateDocument = EmailTemplate & Document;

@Schema({
  toObject: {
    virtuals: true,
  },
})
export class EmailTemplate {
  @Prop({
    required: true,
  })
  name: string;

  @Prop()
  description: string;

  @Prop()
  content: string;

  templateId: string;
}

const EmailTemplateSchema = SchemaFactory.createForClass(EmailTemplate);
EmailTemplateSchema.virtual('templateId').get(function () {
  return this._id.toString();
});
export { EmailTemplateSchema };
