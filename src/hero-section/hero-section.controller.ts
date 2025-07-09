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
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { HeroSectionService } from './hero-section.service';
import { CreateHeroSectionDto } from './dto/create-hero-section.dto';
import { UpdateHeroSectionDto } from './dto/update-hero-section.dto';

@Controller('hero-section')
export class HeroSectionController {
  constructor(private readonly heroSectionService: HeroSectionService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 1, {
      storage: diskStorage({
        destination: './uploads/hero-section',
        filename: (_req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createHeroSectionDto: CreateHeroSectionDto,
  ) {
    if (images && images.length > 0) {
      createHeroSectionDto.images = images.map(
        (file) => `/uploads/hero-section/${file.filename}`,
      );
    }
    return this.heroSectionService.create(createHeroSectionDto);
  }

  @Get()
  async findAll() {
    return this.heroSectionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.heroSectionService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('images', 1, {
      storage: diskStorage({
        destination: './uploads/hero-section',
        filename: (_req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFiles() images: Express.Multer.File[],
    @Body() updateHeroSectionDto: UpdateHeroSectionDto,
  ) {
    if (images && images.length > 0) {
      updateHeroSectionDto.images = images.map(
        (file) => `/uploads/hero-section/${file.filename}`,
      );
    }
    return this.heroSectionService.update(id, updateHeroSectionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.heroSectionService.remove(id);
  }
}
