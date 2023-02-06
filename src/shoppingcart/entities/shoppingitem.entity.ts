import { CreateShoppingitemDto } from '../dto/create-shoppingitem.dto'

export class ShoppingitemEntity implements CreateShoppingitemDto {
  id: number
  name: string
  price: number
  tags: string[]
  brand: string
  image?: string
  count: number

  static create(
    id: number,
    name: string,
    price: number,
    brand: string,
    tags: string[] = [],
    image: string = null,
  ) {
    const p = new ShoppingitemEntity()
    p.id = id
    p.name = name
    p.price = price
    p.brand = brand
    p.tags = [...tags]
    p.image = image
    return p
  }
}
