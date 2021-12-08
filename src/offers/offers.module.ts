import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImagesEntity } from "./Entity/images.entity";
import { OffersController } from "./controllers/offers.controller";
import { OffersEntity } from "./Entity/offers.entity";
import { OffersService } from "./offers.service";

@Module({
  imports: [TypeOrmModule.forFeature([OffersEntity, ImagesEntity])],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
