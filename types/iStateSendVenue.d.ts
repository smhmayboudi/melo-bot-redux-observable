import { IStateSendVenueQuery } from "./iStateSendVenueQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateSendVenue {
  error?: any;
  query?: IStateSendVenueQuery;
  result?: IMessage;
}
