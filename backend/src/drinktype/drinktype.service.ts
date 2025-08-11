import { Injectable } from '@nestjs/common'
import { CreateDrinktypeDto } from './dto/create-drinktype.dto'
import { UpdateDrinktypeDto } from './dto/update-drinktype.dto'

@Injectable()
export class DrinktypeService {
  create(createDrinktypeDto: CreateDrinktypeDto) {
    console.log(createDrinktypeDto)
    return 'This action adds a new drinktype'
  }

  findAll() {
    return `This action returns all drinktype`
  }

  findOne(id: number) {
    return `This action returns a #${id} drinktype`
  }

  update(id: number, updateDrinktypeDto: UpdateDrinktypeDto) {
    console.log(updateDrinktypeDto)
    return `This action updates a #${id} drinktype`
  }

  remove(id: number) {
    return `This action removes a #${id} drinktype`
  }
}
