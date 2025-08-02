import { Controller, Get } from '@nestjs/common'
import { Public } from './shared/public.decorator'

@Controller()
export class AppController {
  @Get()
  @Public()
  root(): string {
    return 'Hello World!'
  }
}
