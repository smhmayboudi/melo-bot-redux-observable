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
      return { ...state, error: action.getWebhookInfo.error };
    case actions.getWebhookInfo.GET_WEBHOOK_INFO_QUERY:
      return { ...state, query: action.getWebhookInfo.query };
    case actions.getWebhookInfo.GET_WEBHOOK_INFO_RESULT:
      return { ...state, result: action.getWebhookInfo.result };
    default:
      return state;
  }
};

export { getWebhookInfo };
