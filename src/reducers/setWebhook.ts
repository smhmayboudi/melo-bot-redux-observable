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
      return { error: action.setWebhook.error, query: state.query };
    case actions.setWebhook.SET_WEBHOOK_QUERY:
      return { query: action.setWebhook.query };
    case actions.setWebhook.SET_WEBHOOK_RESULT:
      return { query: state.query, result: action.setWebhook.result };
    default:
      return state;
  }
};

export { setWebhook };
