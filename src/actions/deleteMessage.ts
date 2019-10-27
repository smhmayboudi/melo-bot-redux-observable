import { IActionDeleteMessage } from "../../types/iActionDeleteMessage";
import { IStateDeleteMessage } from "../../types/iStateDeleteMessage";

const initialState: IStateDeleteMessage = {};

const DELETE_MESSAGE_ERROR: string = "DELETE_MESSAGE_ERROR";
const DELETE_MESSAGE_QUERY: string = "DELETE_MESSAGE_QUERY";
const DELETE_MESSAGE_RESULT: string = "DELETE_MESSAGE_RESULT";

const error: (deleteMessage: IStateDeleteMessage) => IActionDeleteMessage = (
  deleteMessage: IStateDeleteMessage
): IActionDeleteMessage => ({
  deleteMessage: {
    error: deleteMessage.error
  },
  type: DELETE_MESSAGE_ERROR
});
const query: (deleteMessage: IStateDeleteMessage) => IActionDeleteMessage = (
  deleteMessage: IStateDeleteMessage
): IActionDeleteMessage => ({
  deleteMessage: {
    query: deleteMessage.query
  },
  type: DELETE_MESSAGE_QUERY
});
const result: (deleteMessage: IStateDeleteMessage) => IActionDeleteMessage = (
  deleteMessage: IStateDeleteMessage
): IActionDeleteMessage => ({
  deleteMessage: {
    result: deleteMessage.result
  },
  type: DELETE_MESSAGE_RESULT
});

export {
  initialState,
  DELETE_MESSAGE_ERROR,
  DELETE_MESSAGE_QUERY,
  DELETE_MESSAGE_RESULT,
  error,
  query,
  result
};
