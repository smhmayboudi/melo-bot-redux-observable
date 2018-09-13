import { IUser } from "./iUser";

export interface IMessageEntity {
  length: number;
  offset: number;
  type: string;
  url?: string;
  user?: IUser;
}