import { MongoDbModule } from './DB/mongoDB/mongodb.module';
import { MongoDbService } from './DB/mongoDB/mongodb.service';
import { FileDbService } from './services/filedb.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongoDbModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      //imports: [ConfigModule.forRoot()], // import module if not enabled globally
      useFactory: async (config: ConfigService) => {
        console.log('HOST: ', config.get('MAIL_HOST'));
        return {
          // transport: config.get("MAIL_TRANSPORT"),
          // or
          transport: {
            host: config.get('MAIL_HOST'),
            secure: false,
            auth: {
              user: config.get('MAIL_USER'),
              pass: config.get('MAIL_PASSWORD'),
            },
          },
          defaults: {
            from: `"No Reply" <${config.get('MAIL_FROM')}>`,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },

      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: `mongodb+srv://${config.get('MONGODB_USERNAME')}:${config.get(
          'MONGODB_PASSWORD',
        )}@cluster0.loagp.mongodb.net/${config.get(
          'MONGODB_DATABASE',
        )}?retryWrites=true&w=majority`,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [FileDbService, AppService],
})
export class AppModule {}
