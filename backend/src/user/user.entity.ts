import { Entity, PrimaryKey, Property, wrap } from '@mikro-orm/core'
import { IsEmail, IsStrongPassword } from 'class-validator'
import * as argon2 from 'argon2'
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
    this.password = dto.password
  }

  // Create a separate async method for password hashing
  async hashPassword(): Promise<void> {
    this.password = await argon2.hash(this.password || '')
  }

  // Static factory method as an alternative approach
  static async create(dto: CreateUserDto): Promise<User> {
    const user = new User(dto)
    await user.hashPassword()
    return user
  }

  toJSON() {
    return wrap<User>(this).toObject()
  }
}
