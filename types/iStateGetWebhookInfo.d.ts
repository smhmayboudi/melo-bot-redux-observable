import { IStateGetWebhookInfoQuery } from "./iStateGetWebhookInfoQuery";
import { IWebhookInfo } from "./telegramBot/updates/iWebhookInfo";

export interface IStateGetWebhookInfo {
  error?: any;
  query?: IStateGetWebhookInfoQuery;
  result?: IWebhookInfo;
}
