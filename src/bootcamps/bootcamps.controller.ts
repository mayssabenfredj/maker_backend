import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BootcampsService } from './bootcamps.service';
import { CreateBootcampDto } from './dto/create-bootcamp.dto';
import { UpdateBootcampDto } from './dto/update-bootcamp.dto';

@Controller('bootcamps')
export class BootcampsController {
  constructor(private readonly bootcampsService: BootcampsService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads/bootcamps',
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
  async create(
    @Body() createBootcampDto: CreateBootcampDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    if (files && files.length > 0) {
      createBootcampDto.images = files.map(
        (file) => `/uploads/bootcamps/${file.filename}`,
      );
    }
    return this.bootcampsService.create(createBootcampDto);
  }

  @Get()
  async findAll() {
    return this.bootcampsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bootcampsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads/bootcamps',
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
  async update(
    @Param('id') id: string,
    @Body() updateBootcampDto: UpdateBootcampDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    if (files && files.length > 0) {
      updateBootcampDto.images = files.map(
        (file) => `/uploads/bootcamps/${file.filename}`,
      );
    }
    return this.bootcampsService.update(id, updateBootcampDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.bootcampsService.remove(id);
  }
}
