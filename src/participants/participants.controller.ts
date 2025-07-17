import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { RegisterForEventDto } from './dto/create-participant.dto';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  create(@Body() createParticipantDto: RegisterForEventDto) {
    return this.participantsService.registerForEvent(createParticipantDto);
  }

  @Get()
  findAll() {
    return this.participantsService.findAll();
  }
}
