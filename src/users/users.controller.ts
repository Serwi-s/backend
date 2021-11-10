import { Body, Controller, Post, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Response } from "express";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("/login")
  loginUser(
    @Body("email") email: string,
    @Body("password") password: string,
    @Res() response: Response
  ) {
    this.usersService.findUser(email).then((user) => {
      if (typeof user === "undefined") {
        return response.status(400).send({
          error: "User does not exist",
        });
      }

      this.usersService
        .comparePassword(password, user.password)
        .then((isValid) => {
          if (!isValid) {
            return response.status(400).send({
              error: "Password is invalid",
            });
          }
          this.usersService
            .createToken({
              user_id: user.id,
            })
            .then((token) => {
              if (token) {
                return response.send({
                  message: "Success",
                  token: token,
                  user_id: user.id,
                });
              }
            });
        });
    });
  }

  @Post("/register")
  registerUser(
    @Body("email") email: string,
    @Body("password") password: string,
    @Res() response: Response
  ) {
    this.usersService.findUser(email).then((user) => {
      if (typeof user !== "undefined") {
        return response.status(400).send({
          error: "User with that email already exists",
        });
      }

      this.usersService.hashPassword(password).then((hashedPassword) => {
        if (hashedPassword) {
          this.usersService
            .createUser({ email, password: hashedPassword })
            .then((res) => {
              console.log(res);
            });
        }
      });
    });
  }
}
