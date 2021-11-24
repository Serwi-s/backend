import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from "class-validator";

export class UsersDto {
  @IsString()
  @Length(6, 60)
  password: string;

  @IsString()
  @Length(6, 60)
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  phone_number?: string;

  city?: string;

  street?: string;

  home_nr?: string;

  postal_code?: string;
}
