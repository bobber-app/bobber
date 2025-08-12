import { ConflictException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@mikro-orm/nestjs'
import { User } from './user.entity'
import { EntityDTO, EntityManager, EntityRepository } from '@mikro-orm/core'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<EntityDTO<User>> {
    // Check if user already exists
    const existingUser = await this.findOneByUsername(createUserDto.username)
    if (existingUser) {
      throw new ConflictException('User with this username already exists')
    }

    const user = await User.create(createUserDto)
    await this.em.persistAndFlush(user)
    return user.toJSON()
  }

  findAll() {
    return this.userRepository.findAll()
  }

  async findOneById(id?: number) {
    return (await this.userRepository.findOne({ id })) as User | null
  }

  async findOneByUsername(username: string) {
    return (await this.userRepository.findOne({ username })) as User | null
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<EntityDTO<User> | null> {
    const user = await this.findOneById(id)
    if (!user) {
      return null
    }

    // If updating username, check for conflicts
    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser = await this.findOneByUsername(updateUserDto.username)
      if (existingUser) {
        throw new ConflictException('User with this username already exists')
      }
    }

    // Update user properties
    Object.assign(user, updateUserDto)

    await this.em.persistAndFlush(user)
    return user.toJSON()
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
