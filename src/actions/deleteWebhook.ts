import { IActionDeleteWebhook } from "../../types/iActionDeleteWebhook";
import { IStateDeleteWebhook } from "../../types/iStateDeleteWebhook";

const initialState: IStateDeleteWebhook = {};

const DELETE_WEBHOOK_ERROR = "DELETE_WEBHOOK_ERROR";
const DELETE_WEBHOOK_QUERY = "DELETE_WEBHOOK_QUERY";
const DELETE_WEBHOOK_RESULT = "DELETE_WEBHOOK_RESULT";

const error: (deleteWebhook: IStateDeleteWebhook) => IActionDeleteWebhook = (
  deleteWebhook: IStateDeleteWebhook
): IActionDeleteWebhook => ({
  deleteWebhook: { error: deleteWebhook.error },
  type: DELETE_WEBHOOK_ERROR
});
const query: (deleteWebhook: IStateDeleteWebhook) => IActionDeleteWebhook = (
  deleteWebhook: IStateDeleteWebhook
): IActionDeleteWebhook => ({
  deleteWebhook: { query: deleteWebhook.query },
  type: DELETE_WEBHOOK_QUERY
});
const result: (deleteWebhook: IStateDeleteWebhook) => IActionDeleteWebhook = (
  deleteWebhook: IStateDeleteWebhook
): IActionDeleteWebhook => ({
  deleteWebhook: { result: deleteWebhook.result },
  type: DELETE_WEBHOOK_RESULT
});

export {
  initialState,
  DELETE_WEBHOOK_ERROR,
  DELETE_WEBHOOK_QUERY,
  DELETE_WEBHOOK_RESULT,
  error,
  query,
  result
};
