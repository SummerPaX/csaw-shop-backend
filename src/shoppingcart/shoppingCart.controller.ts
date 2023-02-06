import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ShoppingCartService } from './shoppingCart.service'
import { UpdateShoppingitemDto } from './dto/update-shoppingitem.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { SelectDistinctItems, SelectShoppingCartDto, SelectShoppingItemDto } from './dto/select-shopping-item.dto'
import { CheckoutDto, CheckoutResponseDto } from './dto/checkout.dto'

@ApiTags('Shopping Cart')
@Controller('shopping-cart')
@UseGuards(JwtAuthGuard)
export class ShoppingCartController {
  constructor(private readonly service: ShoppingCartService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all Products in the shoppingcart',
    description: 'Returns all Products in the Shopping Cart and Information about Price, Tax and the distinct item count.',
  })
  @ApiCreatedResponse({ type: SelectShoppingCartDto })
  @ApiBearerAuth()
  findAll(): SelectShoppingCartDto {
    return this.service.getCart()
  }

  @Post('add')
  @ApiOperation({
    summary: 'Add product to Cart',
    description: `Add product to Cart, if you leave the count empty it defaults to 1 <br/> 
      Returns the new count of distinct products in the shopping cart <br/>
      Negative numbers are not allowed`,
  })
  @ApiCreatedResponse({ type: SelectDistinctItems })
  @ApiBearerAuth()
  add(@Body() item: UpdateShoppingitemDto): SelectDistinctItems {
    return { distinctItems: this.service.add(item) }
  }

  @Post('remove')
  @ApiOperation({
    summary: 'Remove product from Cart',
    description: `Remove product from Cart, if you leave the count empty it defaults to 1 <br/> 
      Returns the new count of distinct products in the shopping cart <br/> 
      If the count falls below 1 it just deletes the item from the list`,
  })
  @ApiCreatedResponse({ type: SelectDistinctItems })
  @ApiBearerAuth()
  subtract(@Body() item: UpdateShoppingitemDto): SelectDistinctItems {
    return { distinctItems: this.service.subtract(item) }
  }

  @Post('checkout')
  @ApiOperation({
    summary: 'Checkout with shipping and payment-info',
    description: `If shipping info is complete, removes all items from shopping cart`,
  })
  @ApiCreatedResponse({ type: CheckoutResponseDto })
  @ApiBearerAuth()
  checkout(@Body() shippingInfo: CheckoutDto): CheckoutResponseDto {
    this.service.db.push('/items', [])

    return { success: true }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a specific Product from the shoppingcart',
    description: 'Delete a specific Product from the shoppingcart',
  })
  @ApiCreatedResponse({ type: SelectDistinctItems })
  @ApiBearerAuth()
  remove(@Param('id') id: string): SelectDistinctItems {
    this.service.remove(+id)
    return { distinctItems: this.service.getCount() }
  }
}
