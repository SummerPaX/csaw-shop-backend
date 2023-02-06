import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import { SelectProductDto } from './dto/select-product.dto'

@ApiTags('Products')
@ApiCreatedResponse({ type: [SelectProductDto] })
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all Products and optionally filter by Name, Tag or Brand',
    description: 'Returns all Products. Optional: Filter with query string',
  })
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'tag', required: false })
  @ApiQuery({ name: 'brand', required: false })
  @ApiCreatedResponse({ type: [SelectProductDto] })
  @ApiBearerAuth()
  findAll(
    @Query('q') q?: string,
    @Query('tag') tag?: string,
    @Query('brand') brand?: string,
  ): SelectProductDto[] {
    return this.service.products({ q, tag, brand })
  }

  @Get('tags')
  @ApiOperation({
    summary: 'Get all Tags in Products',
    description: 'Returns string Array with all Product Tags',
  })
  @ApiCreatedResponse({ type: [SelectProductDto] })
  @ApiBearerAuth()
  getTags(): string[] {
    return this.service.getTags()
  }

  @Get('tags/:tag')
  @ApiOperation({
    summary: 'Get all Products with specified Tag and filter by Name',
    description:
      'Returns all Products with specified Tag. Optional: Filter with query string',
  })
  @ApiQuery({ name: 'q', required: false })
  @ApiCreatedResponse({ type: [SelectProductDto] })
  @ApiBearerAuth()
  findAllByTag(
    @Param('tag') tag: string,
    @Query('q') q?: string,
  ): SelectProductDto[] {
    return this.service.findAllByTag(tag, q)
  }

  @Get('brands')
  @ApiOperation({
    summary: 'Get all Brands in Products',
    description: 'Returns string Array with all Brands',
  })
  @ApiCreatedResponse({ type: [SelectProductDto] })
  @ApiBearerAuth()
  getBrand(): string[] {
    return this.service.getBrands()
  }

  @Get('brands/:brand')
  @ApiOperation({
    summary: 'Get all Products from specified Brand',
    description:
      'Returns all Products from specified Brand. Optional: Filter with query string',
  })
  @ApiQuery({ name: 'q', required: false })
  @ApiCreatedResponse({ type: [SelectProductDto] })
  @ApiBearerAuth()
  findAllByBrand(
    @Param('brand') brand: string,
    @Query('q') q?: string,
  ): SelectProductDto[] {
    return this.service.findAllByBrand(brand, q)
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific Product by id',
    description: 'Returns a specific Product',
  })
  @ApiCreatedResponse({ type: SelectProductDto })
  @ApiBearerAuth()
  findOne(@Param('id') id: string): SelectProductDto {
    return this.service.findOne(+id)
  }

  @Post()
  @ApiOperation({
    summary: 'Create new product',
    description: 'Crete a new Product Object',
  })
  @ApiCreatedResponse({ type: SelectProductDto })
  @ApiBearerAuth()
  create(@Body() createDto: CreateProductDto): SelectProductDto {
    return this.service.create(createDto)
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a specific Product',
    description: 'Update a specific Product',
  })
  @ApiCreatedResponse({ type: SelectProductDto })
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateProductDto,
  ): SelectProductDto {
    return this.service.update(+id, updateDto)
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a specific Product',
    description: 'Delete a specific Product',
  })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
