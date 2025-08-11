import { Module } from '@nestjs/common'
import { DrinkService } from './drink.service'
import { DrinkController } from './drink.controller'

@Module({
  controllers: [DrinkController],
  providers: [DrinkService],
})
export class DrinkModule {}
