import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator'

export class LoginUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
    minLength: 3,
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  readonly username: string

  @ApiProperty({ description: 'The password of the user', example: 'Azerty123!', minLength: 6 })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string
}
