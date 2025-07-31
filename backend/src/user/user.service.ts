import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@mikro-orm/nestjs'
import { User } from './user.entity'
import { EntityRepository } from '@mikro-orm/core'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user'
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
