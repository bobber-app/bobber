import { Seeder } from '@mikro-orm/seeder'
import type { EntityManager } from '@mikro-orm/core'
import { Drink } from '@/drink/entities/drink.entity'
import { User } from '@/user/user.entity'
import { Drinktype } from '@/drinktype/entities/drinktype.entity'

export class DrinkSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // Get all users and drinktypes
    const users = await em.find(User, {})
    const drinktypes = await em.find(Drinktype, {})

    if (users.length === 0 || drinktypes.length === 0) {
      console.log(
        'No users or drinktypes found. Make sure to run UserSeeder and DrinktypeSeeder first.',
      )
      return
    }

    // Sample drinks data for each user
    const sampleDrinks = [
      { drinktypeNames: ['pils', 'blond', 'leffe blond'], amounts: [2, 1, 1] },
      { drinktypeNames: ['gin', 'vodka', 'whisky'], amounts: [1, 2, 1] },
      { drinktypeNames: ['rode wijn', 'witte wijn', 'prosecco'], amounts: [3, 2, 1] },
      { drinktypeNames: ['duvel', 'westmalle tripel', 'kriek'], amounts: [1, 1, 2] },
      { drinktypeNames: ['tripel', 'ipa', 'stout'], amounts: [2, 1, 1] },
    ]

    for (const user of users) {
      // Get a random selection of sample drinks for this user
      const userDrinks = this.getRandomElements(sampleDrinks, Math.floor(Math.random() * 3) + 2)

      for (const drinkSet of userDrinks) {
        for (let i = 0; i < drinkSet.drinktypeNames.length; i++) {
          const drinktypeName = drinkSet.drinktypeNames[i]
          const amount = drinkSet.amounts[i]

          const drinktype = drinktypes.find((dt) => dt.name === drinktypeName)
          if (!drinktype) continue

          // Check if this exact drink already exists for this user
          const existingDrink = await em.findOne(Drink, {
            user: user.id,
            drinktype: drinktype.id,
            amount,
            size: drinktype.default_size,
            price: drinktype.default_price,
          })

          if (!existingDrink) {
            const drink = em.create(Drink, {
              user,
              drinktype,
              amount,
              size: drinktype.default_size,
              price: drinktype.default_price,
              created_at: this.getRandomDate(),
              updated_at: this.getRandomDate(),
            })
            em.persist(drink)
          }
        }
      }
    }

    await em.flush()
  }

  private getRandomElements<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  private getRandomDate(): Date {
    // Generate random date within the last 30 days
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const randomTime =
      thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime())
    return new Date(randomTime)
  }
}
