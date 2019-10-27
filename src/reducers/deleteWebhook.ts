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
      return { error: action.deleteWebhook.error, query: state.query };
    case actions.deleteWebhook.DELETE_WEBHOOK_QUERY:
      return { query: action.deleteWebhook.query };
    case actions.deleteWebhook.DELETE_WEBHOOK_RESULT:
      return { query: state.query, result: action.deleteWebhook.result };
    default:
      return state;
  }
};

export { deleteWebhook };
