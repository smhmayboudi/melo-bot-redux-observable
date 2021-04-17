import { IStateSendInvoiceQuery } from "./iStateSendInvoiceQuery";
import { IMessage } from "./telegramBot/types/iMessage";

export interface IStateSendInvoice {
  error?: any;
  query?: IStateSendInvoiceQuery;
  result?: IMessage;
}
