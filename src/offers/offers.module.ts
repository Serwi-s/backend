import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImagesEntity } from "./images.entity";
import { OffersController } from "./offers.controller";
import { OffersEntity } from "./offers.entity";
import { OffersService } from "./offers.service";

@Module({
  imports: [TypeOrmModule.forFeature([OffersEntity, ImagesEntity])],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
