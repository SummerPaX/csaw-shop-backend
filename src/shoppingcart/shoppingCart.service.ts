import { Injectable } from '@nestjs/common'
import { ShoppingitemEntity } from './entities/shoppingitem.entity'
import { CreateShoppingitemDto } from './dto/create-shoppingitem.dto'
import { UpdateShoppingitemDto } from './dto/update-shoppingitem.dto'
import { PersistedDummyService } from '../lib/persisted-dummy.service'
import { ProductsService } from '../products/products.service'
import { SelectShoppingCartDto } from './dto/select-shopping-item.dto'

@Injectable()
export class ShoppingCartService extends PersistedDummyService<ShoppingitemEntity, CreateShoppingitemDto, UpdateShoppingitemDto> {
  constructor(private productsService: ProductsService) {
    super()
  }

  getCart(): SelectShoppingCartDto {
    const items = this.findAll()
    const distinctItems = items.length
    const total = items.reduce((sum, item) => (sum += item.price * item.count), 0)
    const tax = total * 0.2

    return {
      items,
      distinctItems,
      tax,
      total,
    }
  }

  getDatabaseName(): string {
    return 'shopping-cart'
  }

  add({ id, count }: UpdateShoppingitemDto) {
    count = count ? count : 1

    let item = this.findAll().find((item) => item.id === id)

    if (!item) {
      item = { ...this.productsService.findOne(id), count }

      const items = this.findAll()
      items.push(item)

      this.db.push('/items', items)

      return items.length
    } else {
      item.count += count

      this.update(id, item)

      return this.getCount()
    }
  }

  subtract({ id, count }: UpdateShoppingitemDto) {
    count = count ? count : 1

    const item = this.findAll().find((item) => item.id === id)

    if (item) {
      item.count -= count

      item.count > 0 ? this.update(id, item) : this.remove(id)
    }

    return this.getCount()
  }

  getCount() {
    return this.findAll().length
  }
}
