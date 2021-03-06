import { Injectable } from "@nestjs/common";
import { UsersEntity } from "./users.entity";
import { InsertResult, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { UserDetailsEntity } from "./details.entity";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

interface UserProps {
  password: string;
  email: string;
}

interface UserDetails extends UserProps {
  phone_number?: string;
  city?: string;
  street?: string;
  home_nr?: string;
  postal_code?: string;
  user_id: QueryDeepPartialEntity<UserDetailsEntity>;
}

export const TOKEN =
  process.env.TOKEN || "09f88add-94eb-44ad-bddb-47a87c7cf959";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(UserDetailsEntity)
    private detailsRepository: Repository<UserDetailsEntity>
  ) {}

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
  }

  async createToken<T>(props: T | any): Promise<string> {
    return jwt.sign(props, TOKEN, { expiresIn: "720h" });
  }

  async verifyToken<T>(
    token: string,
    callback: (error: any, decoded: T) => void
  ) {
    jwt.verify(token, TOKEN, callback);
  }

  public findUser(email: string): Promise<UsersEntity> {
    return this.userRepository.findOne({
      select: ["email", "password", "id"],
      where: {
        email,
      },
    });
  }

  public createUser(props: UserProps): Promise<InsertResult> {
    return this.userRepository.insert({ ...props });
  }

  public addUserDetails(props: Required<UserDetails>) {
    return this.detailsRepository.insert(props);
  }
}
