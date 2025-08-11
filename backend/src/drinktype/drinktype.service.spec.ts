import { Test, TestingModule } from '@nestjs/testing'
import { DrinktypeService } from './drinktype.service'

describe('DrinktypeService', () => {
  let service: DrinktypeService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrinktypeService],
    }).compile()

    service = module.get<DrinktypeService>(DrinktypeService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
