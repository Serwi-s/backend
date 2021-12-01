import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Like, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { OffersEntity } from "./offers.entity";

interface OfferProps {
  user_id: QueryDeepPartialEntity<OffersEntity>;
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
    return this.offersRepository.insert({ ...props });
  }

  public getAllOffers(skip = 0, take = 10): Promise<OffersEntity[]> {
    return this.offersRepository.find({
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
    return this.offersRepository.findOne(id);
  }

  public getOffersByCategory() {
    return;
  }

  public updateOffer(props: unknown) {}
}
