import { Request } from "express";

export interface RequestExtend<Type> extends Request {
  user_id: Type;
}
