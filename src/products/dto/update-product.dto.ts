import { CreateProductDto } from './create-product.dto'
import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsPositive } from 'class-validator'

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ required: false })
  id: number

  @ApiProperty({ required: false })
  name?: string

  @IsNumber()
  @IsPositive()
  @ApiProperty({ required: false })
  price?: number

  @ApiProperty({ required: false })
  image?: string

  @ApiProperty({ required: false })
  brand?: string

  @IsArray()
  @ApiProperty({ required: false })
  tags?: string[]
}
