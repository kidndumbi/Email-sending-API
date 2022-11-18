import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateTemplateDto {

    @IsString()
    @IsNotEmpty()
    public templateId: string;
    @IsString()
    @IsNotEmpty()
    public description: string;
    @IsString()
    @IsNotEmpty()
    public content: string;
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    public name: string;
}