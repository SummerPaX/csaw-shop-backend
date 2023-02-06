import { Injectable } from '@nestjs/common'
import { ProductEntity } from './entities/product.entity'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { PersistedDummyService } from '../lib/persisted-dummy.service'

@Injectable()
export class ProductsService extends PersistedDummyService<
  ProductEntity,
  CreateProductDto,
  UpdateProductDto
> {
  getNewEntity(): ProductEntity {
    return new ProductEntity()
  }

  products({ q, tag, brand }: { q?: string; tag?: string; brand?: string }) {
    return this.findAll()
      .filter((product) =>
        tag
          ? product.tags
              .map((t) => t.toLowerCase().trim())
              .includes(tag.toLowerCase().trim())
          : true,
      )
      .filter((p) =>
        brand
          ? p.name.toLowerCase().includes(brand.toLowerCase().trim())
          : true,
      )
      .filter((p) =>
        q ? p.name.toLowerCase().includes(q.toLowerCase().trim()) : true,
      )
  }

  findAllByTag(tag: string, q?: string) {
    return this.products({ q, tag })
  }

  getDatabaseName(): string {
    return 'products'
  }

  getTags() {
    const tags = this.findAll().reduce((allTags, product) => {
      return [...allTags, ...product.tags]
    }, [])

    return Array.from(new Set(tags)).sort()
  }

  getBrands() {
    const tags = this.findAll().reduce((allBrands, product) => {
      return [...allBrands, product.brand]
    }, [])

    return Array.from(new Set(tags)).sort()
  }

  findAllByBrand(brand: string, q?: string) {
    return this.products({ q, brand })
  }
}
