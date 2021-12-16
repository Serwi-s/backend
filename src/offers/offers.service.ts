import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Like, Repository } from "typeorm";
import { OffersEntity } from "./Entity/offers.entity";

interface OfferProps {
  user_id: string;
  title: string;
  desc: string;
  price: number;
}

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(OffersEntity)
    private offersRepository: Repository<OffersEntity>
  ) {}

  public createOffer(props: OfferProps): Promise<InsertResult> {
    return this.offersRepository.insert({ ...props, exp_date: new Date() });
  }

  public getAllOffers(skip = 0, take = 10): Promise<OffersEntity[]> {
    return this.offersRepository.find({
      relations: ["author", "images"], // remove user sensitive data
      skip,
      take,
    });
  }

  public getOfferByGivenText(
    text: string,
    skip = 0,
    take = 10
  ): Promise<OffersEntity[]> {
    return this.offersRepository.find({
      skip,
      take,
      where: [{ title: Like(`%${text}%`) }, { desc: Like(`%${text}%`) }],
    });
  }

  public getOneByOfferId(id: string): Promise<OffersEntity> {
    return this.offersRepository.findOne({
      where: { id },
    });
  }

  public getOffersByCategory() {
    return;
  }

  public updateOffer(props: unknown) {}
}
