import { IsArray, IsNotEmpty, IsNumber, IsPositive } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SelectProductDto {
  @IsNotEmpty()
  @ApiProperty()
  id: number

  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  price: number

  @ApiProperty({ required: false })
  image?: string

  @ApiProperty({ required: false })
  brand: string

  @IsArray()
  @ApiProperty()
  tags: string[]
}
