import { Entity, PrimaryKey, Property, Unique, wrap } from '@mikro-orm/core'
import { IsEmail, IsStrongPassword } from 'class-validator'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcryptjs'
import { SALT_ROUNDS } from '@/secrets.config'

@Entity()
export class User {
  @PrimaryKey()
  id!: number

  @Property()
  username: string

  @Property()
  @IsEmail()
  @Unique()
  email: string

  @Property({ hidden: true })
  @IsStrongPassword()
  password: string

  @Property({ onCreate: () => new Date() })
  created_at!: Date

  @Property({ onUpdate: () => new Date() })
  updated_at!: Date

  constructor(dto: CreateUserDto) {
    this.username = dto.username
    this.email = dto.email
    this.password = dto.password
  }

  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password || '', SALT_ROUNDS)
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
