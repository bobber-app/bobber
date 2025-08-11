import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity({ tableName: 'drinktype' })
export class Drinktype {
  @PrimaryKey({ autoincrement: true })
  id!: number

  @Property({ length: 100, nullable: false })
  name!: string

  @Property({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  default_price!: number

  @Property({ type: 'decimal', precision: 8, scale: 2, nullable: false })
  default_size!: number

  @Property({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  default_percentage!: number

  @Property({ onCreate: () => new Date() })
  created_at!: Date

  @Property({ onUpdate: () => new Date() })
  updated_at!: Date
}
