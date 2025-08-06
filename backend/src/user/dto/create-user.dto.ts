import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'jane_doe',
    minLength: 3,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  username: string

  @ApiProperty({ description: 'The password of the user', example: 'securepassword', minLength: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string

  @ApiProperty({ description: 'The email address of the user', example: 'jane.doe@example.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string
}
