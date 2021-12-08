import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import { RequestExtend } from "src/@types/types";
import { OffersService } from "../offers.service";
import { Response } from "express";
import { OffersDto } from "../dto/offers.dto";

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

  @Put()
  updateOffer(
    @Body() props: any,
    @Req() { user_id }: RequestExtend<string>,
    @Res() response: Response
  ) {
    if (typeof user_id === "undefined") return;
    this.offersService.getOneByOfferId(props.offer_id).then((result) => {
      if (user_id !== result.user_id) {
        return response.status(400).send({
          error: "NOTALLOWED",
          message: "You are not allowed to update this offer",
          statusCode: 400,
        });
      }
    });
  }

  @Post()
  createOffer(
    @Req() { user_id }: RequestExtend<string>,
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
