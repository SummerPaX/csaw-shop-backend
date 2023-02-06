import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsPositive } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { ShoppingitemEntity } from '../entities/shoppingitem.entity'

export class UpdateShoppingitemDto extends PartialType(ShoppingitemEntity) {
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  id: number

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ required: false })
  count?: number
}
