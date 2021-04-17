import { IStateSetGameScoreQuery } from "./iStateSetGameScoreQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateSetGameScore {
  error?: any;
  query?: IStateSetGameScoreQuery;
  result?: IMessage;
}
