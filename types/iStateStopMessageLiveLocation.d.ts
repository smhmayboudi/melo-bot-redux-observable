import { IStateStopMessageLiveLocationQuery } from "./iStateStopMessageLiveLocationQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateStopMessageLiveLocation {
  error?: any;
  query?: IStateStopMessageLiveLocationQuery;
  result?: boolean | IMessage;
}
