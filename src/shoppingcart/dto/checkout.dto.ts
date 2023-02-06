import { IsArray, IsNotEmpty, IsNumber, IsPositive } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CheckoutDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsNotEmpty()
  @ApiProperty()
  street: string

  @IsNotEmpty()
  @ApiProperty()
  plz: string

  @IsNotEmpty()
  @ApiProperty()
  city: string

  @IsNotEmpty()
  @ApiProperty()
  country: string

  @IsNotEmpty()
  @ApiProperty()
  tel: string
}
export class CheckoutResponseDto {
  success: boolean
}
