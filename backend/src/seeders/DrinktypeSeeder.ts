import { EntityManager, sql } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
import { Drinktype } from '@/drinktype/entities/drinktype.entity'

export class DrinktypeSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const items: Array<
      Pick<Drinktype, 'name' | 'default_price' | 'default_size' | 'default_percentage'>
    > = [
      // Beer
      { name: 'pils', default_price: 2.5, default_size: 25, default_percentage: 5.2 },
      { name: 'blond', default_price: 4.0, default_size: 33, default_percentage: 6.6 },
      { name: 'dubbel', default_price: 4.5, default_size: 33, default_percentage: 7.0 },
      { name: 'tripel', default_price: 4.8, default_size: 33, default_percentage: 8.5 },
      { name: 'ipa', default_price: 4.8, default_size: 33, default_percentage: 6.5 },
      { name: 'stout', default_price: 4.8, default_size: 33, default_percentage: 6.0 },
      { name: 'kriek', default_price: 3.5, default_size: 25, default_percentage: 3.5 },
      { name: 'geuze', default_price: 7.5, default_size: 37.5, default_percentage: 6.0 },
      { name: 'duvel', default_price: 4.8, default_size: 33, default_percentage: 8.5 },
      { name: 'la chouffe', default_price: 4.8, default_size: 33, default_percentage: 8.0 },
      { name: 'westmalle tripel', default_price: 5.2, default_size: 33, default_percentage: 9.5 },
      { name: 'westmalle dubbel', default_price: 4.8, default_size: 33, default_percentage: 7.0 },
      { name: 'leffe blond', default_price: 4.2, default_size: 33, default_percentage: 6.6 },
      { name: 'leffe bruin', default_price: 4.2, default_size: 33, default_percentage: 6.5 },

      // Wine (per glass)
      { name: 'rode wijn', default_price: 3.5, default_size: 12.5, default_percentage: 13 },
      { name: 'witte wijn', default_price: 3.5, default_size: 12.5, default_percentage: 13 },
      { name: 'rosé wijn', default_price: 3.5, default_size: 12.5, default_percentage: 13 },
      { name: 'cava', default_price: 5.0, default_size: 10, default_percentage: 11.5 },
      { name: 'prosecco', default_price: 5.0, default_size: 10, default_percentage: 11 },

      // Spirits (serving = 4 cl)
      { name: 'gin', default_price: 7.5, default_size: 4, default_percentage: 40 },
      { name: 'vodka', default_price: 6.5, default_size: 4, default_percentage: 40 },
      { name: 'rum', default_price: 6.5, default_size: 4, default_percentage: 40 },
      { name: 'whisky', default_price: 7.0, default_size: 4, default_percentage: 40 },
      { name: 'tequila', default_price: 6.5, default_size: 4, default_percentage: 38 },
      { name: 'cognac', default_price: 7.5, default_size: 4, default_percentage: 40 },

      // Liqueurs / aperitifs
      { name: 'amaretto', default_price: 5.0, default_size: 4, default_percentage: 28 },
      { name: 'baileys', default_price: 5.0, default_size: 4, default_percentage: 17 },
      { name: 'porto rood', default_price: 4.0, default_size: 7, default_percentage: 19.5 },
      { name: 'martini bianco', default_price: 4.0, default_size: 7, default_percentage: 15 },
    ]

    for (const dto of items) {
      const exists = await em.findOne(Drinktype, { name: dto.name })
      if (!exists) {
        em.persist(em.create(Drinktype, { ...dto, created_at: new Date(), updated_at: new Date() }))
      }
    }

    await em.flush()
  }
}
