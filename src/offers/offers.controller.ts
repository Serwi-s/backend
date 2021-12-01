import { Controller, Get, Param } from "@nestjs/common";
import { OffersService } from "./offers.service";

@Controller("offers")
export class OffersController {
  constructor(private offersService: OffersService) {}

  @Get()
  getAllOffers() {
    return this.offersService.getAllOffers();
  }

  @Get("/:id")
  getSingleOfferById(@Param("id") id: string) {
    return this.offersService.getOneByOfferId(id);
  }
}
