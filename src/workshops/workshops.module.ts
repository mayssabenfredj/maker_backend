import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkshopsService } from './workshops.service';
import { WorkshopsController } from './workshops.controller';
import { Workshop, WorkshopSchema } from './entities/workshop.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Workshop.name, schema: WorkshopSchema }]),
  ],
  controllers: [WorkshopsController],
  providers: [WorkshopsService],
})
export class WorkshopsModule {}