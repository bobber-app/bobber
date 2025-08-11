import { Injectable } from '@nestjs/common'
import { CreateDrinkDto } from './dto/create-drink.dto'
import { UpdateDrinkDto } from './dto/update-drink.dto'

@Injectable()
export class DrinkService {
  create(createDrinkDto: CreateDrinkDto) {
    console.log(createDrinkDto)
    return 'This action adds a new drink'
  }

  findAll() {
    return `This action returns all drink`
  }

  findOne(id: number) {
    return `This action returns a #${id} drink`
  }

  update(id: number, updateDrinkDto: UpdateDrinkDto) {
    console.log(updateDrinkDto)
    return `This action updates a #${id} drink`
  }

  remove(id: number) {
    return `This action removes a #${id} drink`
  }
}
