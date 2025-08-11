import { Module } from '@nestjs/common'
import { DrinktypeService } from './drinktype.service'
import { DrinktypeController } from './drinktype.controller'

@Module({
  controllers: [DrinktypeController],
  providers: [DrinktypeService],
})
export class DrinktypeModule {}
