import { IActionDeleteWebhook } from "../../types/iActionDeleteWebhook";
import { IStateDeleteWebhook } from "../../types/iStateDeleteWebhook";
import * as actions from "../actions";

const deleteWebhook: (
  state: IStateDeleteWebhook | undefined,
  action: IActionDeleteWebhook
) => IStateDeleteWebhook = (
  state: IStateDeleteWebhook | undefined = actions.deleteWebhook.initialState,
  action: IActionDeleteWebhook
): IStateDeleteWebhook => {
  switch (action.type) {
    case actions.deleteWebhook.DELETE_WEBHOOK_ERROR:
      return { ...state, error: action.deleteWebhook.error };
    case actions.deleteWebhook.DELETE_WEBHOOK_QUERY:
      return { ...state, query: action.deleteWebhook.query };
    case actions.deleteWebhook.DELETE_WEBHOOK_RESULT:
      return { ...state, result: action.deleteWebhook.result };
    default:
      return state;
  }
};

export { deleteWebhook };
