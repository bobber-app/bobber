import { Module } from '@nestjs/common'
import { DrinktypeService } from './drinktype.service'
import { DrinktypeController } from './drinktype.controller'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Drinktype } from '@/drinktype/entities/drinktype.entity'

@Module({
  imports: [MikroOrmModule.forFeature([Drinktype])],
  controllers: [DrinktypeController],
  providers: [DrinktypeService],
  exports: [DrinktypeService],
})
export class DrinktypeModule {}
