import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartModule } from "src/cart/cart.module";
import { AppMiddleware } from "src/middleware/app.middleware";
import { OffersModule } from "src/offers/offers.module";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, OffersModule, CartModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes("*");
  }
}
