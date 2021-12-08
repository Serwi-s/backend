import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImagesEntity } from "./Entity/images.entity";
import { OffersController } from "./controllers/offers.controller";
import { OffersEntity } from "./Entity/offers.entity";
import { OffersService } from "./offers.service";
import { RatingsEntity } from "./Entity/ratings.entity";
import { ImagesController } from "./controllers/images.controller";
import { RatingsController } from "./controllers/ratings.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([OffersEntity, ImagesEntity, RatingsEntity]),
  ],
  controllers: [OffersController, ImagesController, RatingsController],
  providers: [OffersService],
  exports: [OffersService],
})
export class OffersModule {}
