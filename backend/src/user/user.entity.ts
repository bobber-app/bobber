import { Entity, PrimaryKey, Property, wrap } from '@mikro-orm/core'
import { IsEmail, IsStrongPassword } from 'class-validator'
import crypto from 'crypto'
import { CreateUserDto } from './dto/create-user.dto'

@Entity()
export class User {
  @PrimaryKey()
  id!: number

  @Property()
  username: string

  @Property()
  @IsEmail()
  email: string

  @Property({ hidden: true })
  @IsStrongPassword()
  password: string

  constructor(dto: CreateUserDto) {
    this.username = dto.username
    this.email = dto.email
    this.password = crypto.createHmac('sha256', dto.password).digest('hex')
  }

  toJSON() {
    return wrap<User>(this).toObject()
  }
}
