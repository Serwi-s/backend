import { IsEmail, IsString, Length } from "class-validator";

export class UsersDto {
  @IsString()
  @Length(6, 60)
  password: string;

  @IsString()
  @Length(6, 60)
  @IsEmail()
  email: string;
}
