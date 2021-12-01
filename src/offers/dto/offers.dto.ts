import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class OffersDto {
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  desc: string;
}
