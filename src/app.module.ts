import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { EnigmeModule } from './enigme/enigme.module';
import { ActivityModule } from './activity/activity.module';
import config from '../config';
import { RevealModule } from "./reveal/reveal.module";

const fullMongoUri =
  'mongodb+srv://' +
  config.mongo.user +
  ':' +
  config.mongo.pwd +
  config.mongo.uri;

@Module({
  imports: [
    MongooseModule.forRoot(fullMongoUri),
    UserModule,
    AuthModule,
    EnigmeModule,
    ActivityModule,
    RevealModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      // Users
      { path: 'api/users', method: RequestMethod.GET },
      { path: 'api/users/me', method: RequestMethod.GET },
      { path: 'api/users/:id', method: RequestMethod.GET },
      { path: 'api/users/:id', method: RequestMethod.PATCH },
      { path: 'api/users/:id', method: RequestMethod.DELETE },
      // Enigmes
      { path: 'api/enigmes', method: RequestMethod.POST },
      { path: 'api/enigmes', method: RequestMethod.GET },
      { path: 'api/enigmes/:id', method: RequestMethod.PATCH },
      { path: 'api/enigmes/:id', method: RequestMethod.DELETE },
      // Activity
      { path: 'api/activity', method: RequestMethod.POST },
      { path: 'api/activity/:id', method: RequestMethod.PATCH },
      { path: 'api/activity/:id', method: RequestMethod.DELETE },
      // Reveal
      { path: 'api/reveal', method: RequestMethod.POST },
      { path: 'api/reveal/:id', method: RequestMethod.PATCH },
      { path: 'api/reveal/:id', method: RequestMethod.DELETE },
    );
  }
}
