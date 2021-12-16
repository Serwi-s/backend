import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserDetailsEntity } from "./details.entity";
import { UsersController } from "./users.controller";
import { UsersEntity } from "./users.entity";
import { UsersService } from "./users.service";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, UserDetailsEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
