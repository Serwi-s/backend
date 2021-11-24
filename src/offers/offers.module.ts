import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OffersController } from "./offers.controller";
import { OffersEntity } from "./offers.entity";
import { OffersService } from "./offers.service";

@Module({
  imports: [TypeOrmModule.forFeature([OffersEntity])],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
