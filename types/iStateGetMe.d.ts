import { IStateGetMeQuery } from "./iStateGetMeQuery";
import { IUser } from "./telegramBot/types/iUser";

export interface IStateGetMe {
  error?: any;
  query?: IStateGetMeQuery;
  result?: IUser;
}
