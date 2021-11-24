import { Injectable } from "@nestjs/common";
import { UsersEntity } from "./users.entity";
import { InsertResult, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

interface UserProps {
  password: string;
  email: string;
  name: string;
  surname: string;
  phone_number?: string;
  city?: string;
  street?: string;
  home_nr?: string;
  postal_code?: string;
}

export const TOKEN =
  process.env.TOKEN || "09f88add-94eb-44ad-bddb-47a87c7cf959";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>
  ) {}

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
  }

  async createToken(props: any): Promise<string> {
    return jwt.sign(props, TOKEN, { expiresIn: "720h" });
  }

  async verifyToken(token: string): Promise<any> {
    return jwt.verify(token, TOKEN);
  }

  public findUser(email: string): Promise<UsersEntity> {
    return this.userRepository.findOne({ email });
  }

  public createUser(props: UserProps): Promise<InsertResult> {
    return this.userRepository.insert({ ...props, joined_at: new Date() });
  }
}
