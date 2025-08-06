import { Entity, PrimaryKey, Property, wrap } from '@mikro-orm/core'
import { IsEmail, IsStrongPassword } from 'class-validator'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcryptjs'

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

  async hashPassword(): Promise<void> {
    const saltRounds = 12 // You can adjust this based on your security needs
    this.password = await bcrypt.hash(this.password || '', saltRounds)
  }

  static async create(dto: CreateUserDto): Promise<User> {
    const user = new User(dto)
    await user.hashPassword()
    return user
  }

  async verifyPassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password)
  }

  toJSON() {
    return wrap<User>(this).toObject()
  }
}
