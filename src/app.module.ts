import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BootcampsModule } from './bootcamps/bootcamps.module';
import { ProjectsModule } from './projects/projects.module';
import { ServicesModule } from './services/services.module';
import { WorkshopsModule } from './workshops/workshops.module';
import { EventsModule } from './events/events.module';
import { ParticipantsModule } from './participants/participants.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@makerskills.ad4zvlg.mongodb.net/?retryWrites=true&w=majority&appName=makerskills`,
    ),
    ProductsModule,
    CategoriesModule,
    BootcampsModule,
    ProjectsModule,
    ServicesModule,
    WorkshopsModule,
    EventsModule,
    ParticipantsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
