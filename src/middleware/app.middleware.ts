import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response, NextFunction } from "express";
import { RequestExtend } from "src/@types/types";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AppMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  use(req: RequestExtend, _: Response, next: NextFunction) {
    const headers = req.headers as any;

    if (
      headers.token !== undefined &&
      headers.token !== null &&
      headers.token !== ""
    ) {
      this.usersService.verifyToken<{ user_id: string }>(
        headers.token,
        (err, decoded) => {
          if (decoded) {
            req.user_id = decoded.user_id;
          }
        }
      );
    }

    next();
  }
}
