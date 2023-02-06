import { Module } from '@nestjs/common'
import { ShoppingCartService } from './shoppingCart.service'
import { ShoppingCartController } from './shoppingCart.controller'
import { ProductsModule } from '../products/products.module'

@Module({
  imports: [ProductsModule],
  providers: [ShoppingCartService],
  controllers: [ShoppingCartController],
})
export class ShoppingCartModule {}
