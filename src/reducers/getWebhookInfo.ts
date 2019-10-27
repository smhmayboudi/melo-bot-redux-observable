import { IActionGetWebhookInfo } from "../../types/iActionGetWebhookInfo";
import { IStateGetWebhookInfo } from "../../types/iStateGetWebhookInfo";
import * as actions from "../actions";

const getWebhookInfo: (
  state: IStateGetWebhookInfo | undefined,
  action: IActionGetWebhookInfo
) => IStateGetWebhookInfo = (
  state: IStateGetWebhookInfo | undefined = actions.getWebhookInfo.initialState,
  action: IActionGetWebhookInfo
): IStateGetWebhookInfo => {
  switch (action.type) {
    case actions.getWebhookInfo.GET_WEBHOOK_INFO_ERROR:
      return { error: action.getWebhookInfo.error, query: state.query };
    case actions.getWebhookInfo.GET_WEBHOOK_INFO_QUERY:
      return { query: action.getWebhookInfo.query };
    case actions.getWebhookInfo.GET_WEBHOOK_INFO_RESULT:
      return { query: state.query, result: action.getWebhookInfo.result };
    default:
      return state;
  }
};

export { getWebhookInfo };
