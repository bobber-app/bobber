import { Seeder } from '@mikro-orm/seeder'
import type { EntityManager } from '@mikro-orm/core'
import { User } from '@/user/user.entity'

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const users: Array<Pick<User, 'username' | 'email' | 'password'>> = [
      { username: 'bob', email: 'bob@bobber.be', password: 'Azerty123!' },
      { username: 'kilianleroy', email: 'kilian@bobber.be', password: 'Azerty123!' },
      { username: 'artvandervennet', email: 'art@bobber.be', password: 'Azerty123!' },
    ]

    for (const dto of users) {
      const exists = await em.findOne(User, { email: dto.email })
      if (!exists) {
        em.persist(em.create(User, dto))
      }
    }

    await em.flush()
  }
}
