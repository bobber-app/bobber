import { Test, TestingModule } from '@nestjs/testing'
import { DrinktypeController } from './drinktype.controller'
import { DrinktypeService } from './drinktype.service'

describe('DrinktypeController', () => {
  let controller: DrinktypeController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrinktypeController],
      providers: [DrinktypeService],
    }).compile()

    controller = module.get<DrinktypeController>(DrinktypeController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
