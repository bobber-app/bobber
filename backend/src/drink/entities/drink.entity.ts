import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { Drinktype } from '@/drinktype/entities/drinktype.entity'

@Entity()
export class Drink {
  @PrimaryKey({ autoincrement: true })
  id!: number

  @ManyToOne()
  drinktype!: Drinktype

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number

  @Property({ type: 'decimal', precision: 8, scale: 2 })
  size!: number

  @Property({ type: 'decimal', precision: 5, scale: 2 })
  price!: number

  @Property({ onCreate: () => new Date() })
  created_at!: Date

  @Property({ onUpdate: () => new Date() })
  updated_at!: Date
}
