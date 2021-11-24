import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AppMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers as any;

    if (headers.token !== undefined && headers.token !== null) {
      this.usersService.verifyToken(headers.token).then((result) => {
        console.log(result);
      });
    }

    next();
  }
}
