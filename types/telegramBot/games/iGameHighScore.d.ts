import { IUser } from "../types/iUser";

export interface IGameHighScore {
  position: number;
  score: number;
  user: IUser;
}
