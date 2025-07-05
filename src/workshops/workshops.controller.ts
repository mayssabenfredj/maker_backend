// workshops/workshops.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { WorkshopsService } from './workshops.service';
import {
  CreateWorkshopDto,
  CreateWorkshopForm,
  UpdateWorkshopDto,
  UpdateWorkshopForm,
} from './dto/workshop.dto';
import { ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Workshops')
@Controller('workshops')
export class WorkshopsController {
  constructor(private readonly workshopsService: WorkshopsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/workshops',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return cb(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateWorkshopForm })
  async create(
    @Body() createWorkshopDto: CreateWorkshopDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      createWorkshopDto.coverImagePath = `/uploads/workshops/${file.filename}`;
    }
    return this.workshopsService.create(createWorkshopDto);
  }

  @Get()
  async findAll() {
    return this.workshopsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.workshopsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/workshops',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return cb(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateWorkshopForm })
  async update(
    @Param('id') id: string,
    @Body() updateWorkshopDto: UpdateWorkshopDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      updateWorkshopDto.coverImagePath = `/uploads/workshops/${file.filename}`;
    }
    return this.workshopsService.update(id, updateWorkshopDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.workshopsService.remove(id);
  }
}
