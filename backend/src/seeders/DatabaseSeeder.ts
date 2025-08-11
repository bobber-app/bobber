// src/seeders/DatabaseSeeder.ts
import type { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
import { DrinktypeSeeder } from '@/seeders/DrinktypeSeeder'

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await this.call(em, [DrinktypeSeeder])
  }
}
