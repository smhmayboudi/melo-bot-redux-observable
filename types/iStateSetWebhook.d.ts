import { IStateSetWebhookQuery } from "./iStateSetWebhookQuery";

export interface IStateSetWebhook {
  error?: any;
  query?: IStateSetWebhookQuery;
  result?: boolean;
}
