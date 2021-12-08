import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchasesController } from "./purchases.controller";
import { PurchasesEntity } from "./purchases.entity";
import { PurchasesService } from "./purchases.service";

@Module({
  imports: [TypeOrmModule.forFeature([PurchasesEntity])],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
