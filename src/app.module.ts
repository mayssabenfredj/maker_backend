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
import { PartnersModule } from './partners/partners.module';
import { ReviewsModule } from './reviews/reviews.module';
import { BlogsModule } from './blogs/blogs.module';
import { HeroSectionModule } from './hero-section/hero-section.module';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'], // Load environment variables from these files
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        console.log('MONGODB_USER:', process.env.MONGODB_USER);
        console.log('MONGODB_PASSWORD:', process.env.MONGODB_PASSWORD);
        return {
          uri: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@makerskills.ad4zvlg.mongodb.net/?retryWrites=true&w=majority&appName=makerskills`,
        };
      },
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@makerskills.ad4zvlg.mongodb.net/?retryWrites=true&w=majority&appName=makerskills`,
    ),
    ProductsModule,
    CategoriesModule,
    BootcampsModule,
    ProjectsModule,
    ServicesModule,
    FileUploadModule,
    WorkshopsModule,
    EventsModule,
    ParticipantsModule,
    AuthModule,
    PartnersModule,
    ReviewsModule,
    BlogsModule,
    HeroSectionModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
