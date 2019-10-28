import { IActionSetWebhook } from "../../types/iActionSetWebhook";
import { IStateSetWebhook } from "../../types/iStateSetWebhook";
import * as actions from "../actions";

const setWebhook: (
  state: IStateSetWebhook | undefined,
  action: IActionSetWebhook
) => IStateSetWebhook = (
  state: IStateSetWebhook | undefined = actions.setWebhook.initialState,
  action: IActionSetWebhook
): IStateSetWebhook => {
  switch (action.type) {
    case actions.setWebhook.SET_WEBHOOK_ERROR:
      return { ...state, error: action.setWebhook.error };
    case actions.setWebhook.SET_WEBHOOK_QUERY:
      return { ...state, query: action.setWebhook.query };
    case actions.setWebhook.SET_WEBHOOK_RESULT:
      return { ...state, result: action.setWebhook.result };
    default:
      return state;
  }
};

export { setWebhook };
