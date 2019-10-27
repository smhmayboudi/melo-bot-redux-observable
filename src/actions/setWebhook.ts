import { IActionSetWebhook } from "../../types/iActionSetWebhook";
import { IStateSetWebhook } from "../../types/iStateSetWebhook";

const initialState: IStateSetWebhook = {};

const SET_WEBHOOK_ERROR: string = "SET_WEBHOOK_ERROR";
const SET_WEBHOOK_QUERY: string = "SET_WEBHOOK_QUERY";
const SET_WEBHOOK_RESULT: string = "SET_WEBHOOK_RESULT";

const error: (setWebhook: IStateSetWebhook) => IActionSetWebhook = (
  setWebhook: IStateSetWebhook
): IActionSetWebhook => ({
  setWebhook: {
    error: setWebhook.error
  },
  type: SET_WEBHOOK_ERROR
});
const query: (setWebhook: IStateSetWebhook) => IActionSetWebhook = (
  setWebhook: IStateSetWebhook
): IActionSetWebhook => ({
  setWebhook: {
    query: setWebhook.query
  },
  type: SET_WEBHOOK_QUERY
});
const result: (setWebhook: IStateSetWebhook) => IActionSetWebhook = (
  setWebhook: IStateSetWebhook
): IActionSetWebhook => ({
  setWebhook: {
    result: setWebhook.result
  },
  type: SET_WEBHOOK_RESULT
});

export {
  initialState,
  SET_WEBHOOK_ERROR,
  SET_WEBHOOK_QUERY,
  SET_WEBHOOK_RESULT,
  error,
  query,
  result
};
