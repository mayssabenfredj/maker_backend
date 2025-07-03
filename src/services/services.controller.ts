import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import {
  AddCategoriesDto,
  CreateServiceDto,
  UpdateServiceDto,
  UpdateStatusDto,
} from './dto/service.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { Service } from './entities/service.entity';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new service' })
  @ApiResponse({
    status: 201,
    description: 'Service created successfully',
    type: Service,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CreateServiceDto })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all services' })
  @ApiResponse({
    status: 200,
    description: 'List of all services',
    type: [Service],
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Filter services by category ID',
  })
  @ApiQuery({
    name: 'active',
    required: false,
    description: 'Filter active/inactive services',
    type: Boolean,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search by service name or description',
  })
  findAll(
    @Query('category') category?: string,
    @Query('active') active?: boolean,
    @Query('search') search?: string,
  ) {
    return this.servicesService.findAll({ category, active, search });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get service by ID' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({
    status: 200,
    description: 'Service details',
    type: Service,
  })
  @ApiResponse({ status: 404, description: 'Service not found' })
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({
    status: 200,
    description: 'Service updated successfully',
    type: Service,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Service not found' })
  @ApiBody({ type: UpdateServiceDto })
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({ status: 200, description: 'Service deleted successfully' })
  @ApiResponse({ status: 404, description: 'Service not found' })
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }

  @Post(':id/categories')
  @ApiOperation({ summary: 'Add categories to service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({
    status: 200,
    description: 'Categories added successfully',
    type: Service,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Service not found' })
  @ApiBody({
    description: 'Array of category IDs',
    type: AddCategoriesDto, // Changed from [String] to AddCategoriesDto
  })
  addCategories(
    @Param('id') id: string,
    @Body() addCategoriesDto: AddCategoriesDto, // Changed from string[] to AddCategoriesDto
  ) {
    return this.servicesService.addCategories(id, addCategoriesDto);
  }

  @Delete(':id/categories/:categoryId')
  @ApiOperation({ summary: 'Remove category from service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiParam({ name: 'categoryId', description: 'Category ID to remove' })
  @ApiResponse({
    status: 200,
    description: 'Category removed successfully',
    type: Service,
  })
  @ApiResponse({ status: 404, description: 'Service or category not found' })
  removeCategory(
    @Param('id') id: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.servicesService.removeCategory(id, categoryId);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update service active status' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({
    status: 200,
    description: 'Status updated successfully',
    type: Service,
  })
  @ApiResponse({ status: 404, description: 'Service not found' })
  @ApiBody({
    description: 'New active status',
    type: UpdateStatusDto, // Changed from schema definition to DTO type
  })
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto, // Changed from isActive boolean to DTO
  ) {
    return this.servicesService.updateStatus(id, updateStatusDto);
  }

  @Get(':id/related')
  @ApiOperation({ summary: 'Get related services' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({
    status: 200,
    description: 'List of related services',
    type: [Service],
  })
  getRelatedServices(@Param('id') id: string) {
    return this.servicesService.getRelatedServices(id);
  }
}
