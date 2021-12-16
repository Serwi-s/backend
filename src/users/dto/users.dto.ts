import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class RegisterDto {
  @IsString()
  @Length(6, 60)
  password: string;

  @IsString()
  @Length(6, 60)
  @IsEmail()
  email: string;
}

export class LoginDto {
  @IsString()
  @Length(6, 60)
  password: string;

  @IsString()
  @Length(6, 60)
  @IsEmail()
  email: string;
}
