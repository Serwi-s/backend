import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Response } from "express";
import { RegisterDto, LoginDto } from "./dto/users.dto";
import { RequestExtend } from "src/@types/types";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("/token") // refresh token
  useRefreshToken(@Req() { user_id }: RequestExtend<string>) {
    if (typeof user_id === "undefined") return "not allowed";
    return this.usersService.createToken({ user_id });
  }

  @Post("/login")
  loginUser(@Body() { password, email }: LoginDto, @Res() response: Response) {
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
                response.cookie("user", token, {
                  secure: true,
                  httpOnly: true,
                  maxAge: 1728 * 10000, // 48h
                });
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
  registerUser(@Body() props: RegisterDto, @Res() response: Response) {
    this.usersService.findUser(props.email).then((user) => {
      if (typeof user !== "undefined") {
        return response.status(400).send({
          error: "User with that email already exists",
        });
      }

      this.usersService.hashPassword(props.password).then((hashedPassword) => {
        if (hashedPassword) {
          this.usersService
            .createUser({ ...props, password: hashedPassword })
            .then(({ raw, identifiers }) => {
              const id = identifiers[0]?.id;

              if (raw.affectedRows === 0)
                return response.status(400).send({
                  error: "Creating user failed",
                  statusCode: 400,
                });

              if (raw.affectedRows > 0) {
                this.usersService.createToken({ user_id: id }).then((token) => {
                  response.cookie("user", token, {
                    secure: true,
                    httpOnly: true,
                    maxAge: 1728 * 10000, // 48h
                  });
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
