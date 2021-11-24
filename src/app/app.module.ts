import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppMiddleware } from "src/middleware/app.middleware";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes("*");
  }
}
