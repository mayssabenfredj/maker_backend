import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkshopsService } from './workshops.service';
import { WorkshopsController } from './workshops.controller';
import { Workshop, WorkshopSchema } from './entities/workshop.entity';
import { Participant, ParticipantSchema } from '../participants/entities/participant.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workshop.name, schema: WorkshopSchema },
      { name: Participant.name, schema: ParticipantSchema },
    ]),
  ],
  controllers: [WorkshopsController],
  providers: [WorkshopsService],
})
export class WorkshopsModule {}