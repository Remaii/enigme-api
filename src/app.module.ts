import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
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
        { path: 'users/me', method: RequestMethod.GET },
        { path: 'users/:id', method: RequestMethod.GET },
        { path: 'users/:id', method: RequestMethod.PATCH },
        { path: 'users/:id', method: RequestMethod.DELETE },
        { path: 'enigmes', method: RequestMethod.POST },
        { path: 'enigmes/:id', method: RequestMethod.PATCH },
      );
  }
}
