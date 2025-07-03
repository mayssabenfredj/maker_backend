import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkshopsService } from './workshops.service';
import {
  CreateWorkshopDto,
  UpdateWorkshopDto,
  WorkshopResponseDto,
} from './dto/workshop.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Workshops')
@Controller('workshops')
export class WorkshopsController {
  constructor(private readonly workshopsService: WorkshopsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workshop' })
  @ApiResponse({
    status: 201,
    description: 'The workshop has been successfully created.',
    type: WorkshopResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreateWorkshopDto })
  create(@Body() createWorkshopDto: CreateWorkshopDto) {
    return this.workshopsService.create(createWorkshopDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all workshops' })
  @ApiResponse({
    status: 200,
    description: 'List of all available workshops.',
    type: [WorkshopResponseDto],
  })
  findAll() {
    return this.workshopsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific workshop by ID' })
  @ApiParam({
    name: 'id',
    description: 'Workshop ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'The requested workshop details.',
    type: WorkshopResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Workshop not found.' })
  findOne(@Param('id') id: string) {
    return this.workshopsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a workshop' })
  @ApiParam({
    name: 'id',
    description: 'Workshop ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'The updated workshop details.',
    type: WorkshopResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Workshop not found.' })
  @ApiBody({ type: UpdateWorkshopDto })
  update(
    @Param('id') id: string,
    @Body() updateWorkshopDto: UpdateWorkshopDto,
  ) {
    return this.workshopsService.update(id, updateWorkshopDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a workshop' })
  @ApiParam({
    name: 'id',
    description: 'Workshop ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 204,
    description: 'The workshop has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Workshop not found.' })
  remove(@Param('id') id: string) {
    return this.workshopsService.remove(id);
  }
}
