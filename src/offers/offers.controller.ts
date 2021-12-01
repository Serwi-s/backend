import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import { RequestExtend } from "src/@types/types";
import { OffersService } from "./offers.service";
import { Response } from "express";
import { OffersDto } from "./dto/offers.dto";
import { UsersEntity } from "src/users/users.entity";
import { OffersEntity } from "./offers.entity";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

@Controller("offers")
export class OffersController {
  constructor(private offersService: OffersService) {}

  @Get()
  getAllOffers(@Query("take") take: number, @Query("skip") skip: number) {
    return this.offersService.getAllOffers(skip, take);
  }

  @Get("/:id")
  getSingleOfferById(@Param("id") id: string) {
    return this.offersService.getOneByOfferId(id);
  }

  @Get("/:text")
  getOffersByText(
    @Param("text") text: string,
    @Query("take") take: number,
    @Query("skip") skip: number
  ) {
    return this.offersService.getOfferByGivenText(text, skip, take);
  }

  @Post()
  createOffer(
    @Req() { user_id }: RequestExtend<QueryDeepPartialEntity<OffersEntity>>,
    @Body() props: OffersDto,
    @Res() response: Response
  ) {
    // only for auth users, apply GUARDS later
    if (typeof user_id === "undefined")
      return response.status(403).send({
        error: "UNAUTHORIZED",
        message: "You are not authorized to perform this action",
        statusCode: 403,
      });

    this.offersService.createOffer({ ...props, user_id }).then(({ raw }) => {
      if (raw.affectedRows === 0) {
        return response.status(400).send({
          error: "ERROR",
          message: "Something went wrong, try again!",
          statusCode: 400,
        });
      }
      return response.status(201).send({
        message: "Offer created successfully",
        statusCode: 201,
        error: null,
      });
    });
  }
}
