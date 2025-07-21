import { Entity, Opt, PrimaryKey, Property, wrap } from '@mikro-orm/core'
import { IsEmail, IsStrongPassword } from 'class-validator'
import crypto from 'crypto'

@Entity()
export class User {
  @PrimaryKey()
  id!: number

  @Property()
  username: string

  @Property({ hidden: true })
  @IsEmail()
  email: string

  @Property()
  bio: string & Opt = ''

  @Property()
  image: string & Opt = ''

  @Property({ hidden: true })
  @IsStrongPassword()
  password: string

  constructor(username: string, email: string, password: string) {
    this.username = username
    this.email = email
    this.password = crypto.createHmac('sha256', password).digest('hex')
  }

  toJSON() {
    const o = wrap<User>(this).toObject()
    o.image = this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'
    return o
  }
}
