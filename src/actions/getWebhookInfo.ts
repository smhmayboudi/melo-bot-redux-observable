import { IActionGetWebhookInfo } from "../../types/iActionGetWebhookInfo";
import { IStateGetWebhookInfo } from "../../types/iStateGetWebhookInfo";

const initialState: IStateGetWebhookInfo = {};

const GET_WEBHOOK_INFO_ERROR = "GET_WEBHOOK_INFO_ERROR";
const GET_WEBHOOK_INFO_QUERY = "GET_WEBHOOK_INFO_QUERY";
const GET_WEBHOOK_INFO_RESULT = "GET_WEBHOOK_INFO_RESULT";

const error: (getWebhookInfo: IStateGetWebhookInfo) => IActionGetWebhookInfo = (
  getWebhookInfo: IStateGetWebhookInfo
): IActionGetWebhookInfo => ({
  getWebhookInfo: { error: getWebhookInfo.error },
  type: GET_WEBHOOK_INFO_ERROR
});
const query: (getWebhookInfo: IStateGetWebhookInfo) => IActionGetWebhookInfo = (
  getWebhookInfo: IStateGetWebhookInfo
): IActionGetWebhookInfo => ({
  getWebhookInfo: { query: getWebhookInfo.query },
  type: GET_WEBHOOK_INFO_QUERY
});
const result: (
  getWebhookInfo: IStateGetWebhookInfo
) => IActionGetWebhookInfo = (
  getWebhookInfo: IStateGetWebhookInfo
): IActionGetWebhookInfo => ({
  getWebhookInfo: { result: getWebhookInfo.result },
  type: GET_WEBHOOK_INFO_RESULT
});

export {
  initialState,
  GET_WEBHOOK_INFO_ERROR,
  GET_WEBHOOK_INFO_QUERY,
  GET_WEBHOOK_INFO_RESULT,
  error,
  query,
  result
};
