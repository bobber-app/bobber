import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator'

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  readonly username: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string
}
