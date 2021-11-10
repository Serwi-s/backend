import { Body, Controller, Post, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Response } from "express";
import { UsersDto } from "./dto/users.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("/login")
  loginUser(@Body() { password, email }: UsersDto, @Res() response: Response) {
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
    @Body() { password, email }: UsersDto,
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
            .then(({ raw, identifiers }) => {
              const id = identifiers[0]?.id;

              if (raw.affectedRows > 0) {
                this.usersService.createToken({ user_id: id }).then((token) => {
                  return response.status(201).send({
                    user_id: id,
                    token: token,
                    message: "Success",
                  });
                });
              }
            });
        }
      });
    });
  }
}
