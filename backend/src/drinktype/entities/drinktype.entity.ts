import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class Drinktype {
  @PrimaryKey()
  id!: number

  @Property()
  name: string

  @Property()
  default_price: number

  @Property()
  default_size: number
}
