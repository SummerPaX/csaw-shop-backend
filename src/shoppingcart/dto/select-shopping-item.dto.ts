import { IsArray, IsNotEmpty, IsNumber, IsPositive } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SelectShoppingItemDto {
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

  @IsNumber()
  @IsPositive()
  @ApiProperty({ required: false })
  count?: number
}

export class SelectShoppingCartDto {
  @ApiProperty({ type: [SelectShoppingItemDto] })
  items: SelectShoppingItemDto[]

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  distinctItems: number

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  total: number

  @IsNumber()
  @IsPositive()
  @ApiProperty({ required: false })
  tax: number
}

export class SelectDistinctItems {
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  distinctItems: number
}
