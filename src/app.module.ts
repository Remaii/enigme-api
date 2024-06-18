import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { SessionModule } from 'nestjs-session';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { EnigmeModule } from './enigme/enigme.module';
import config from '../config';

const fullMongoUri =
  'mongodb+srv://' +
  config.mongo.user +
  ':' +
  config.mongo.pwd +
  config.mongo.uri;

@Module({
  imports: [
    SessionModule.forRoot({
      session: { secret: config.secretKey },
    }),
    MongooseModule.forRoot(fullMongoUri),
    UserModule,
    AuthModule,
    EnigmeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.GET },
        { path: 'users/:id', method: RequestMethod.GET },
      );
  }
}
