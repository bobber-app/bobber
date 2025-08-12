import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { DrinktypeService } from './drinktype.service'
import { CreateDrinktypeDto } from './dto/create-drinktype.dto'
import { UpdateDrinktypeDto } from './dto/update-drinktype.dto'

@Controller('drinktype')
export class DrinktypeController {
  constructor(private readonly drinktypeService: DrinktypeService) {}

  @Post()
  create(@Body() createDrinktypeDto: CreateDrinktypeDto) {
    return this.drinktypeService.create(createDrinktypeDto)
  }

  @Get()
  findAll() {
    return this.drinktypeService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drinktypeService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDrinktypeDto: UpdateDrinktypeDto) {
    return this.drinktypeService.update(+id, updateDrinktypeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.drinktypeService.remove(+id)
  }
}
