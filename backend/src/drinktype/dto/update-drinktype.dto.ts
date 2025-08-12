import { PartialType } from '@nestjs/swagger'
import { CreateDrinktypeDto } from './create-drinktype.dto'

export class UpdateDrinktypeDto extends PartialType(CreateDrinktypeDto) {}
