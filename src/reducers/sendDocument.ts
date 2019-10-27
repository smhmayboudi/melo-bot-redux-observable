import { IActionSendDocument } from "../../types/iActionSendDocument";
import { IStateSendDocument } from "../../types/iStateSendDocument";
import * as actions from "../actions";

const sendDocument: (
  state: IStateSendDocument | undefined,
  action: IActionSendDocument
) => IStateSendDocument = (
  state: IStateSendDocument | undefined = actions.sendDocument.initialState,
  action: IActionSendDocument
): IStateSendDocument => {
  switch (action.type) {
    case actions.sendDocument.SEND_DOCUMENT_ERROR:
      return { error: action.sendDocument.error, query: state.query };
    case actions.sendDocument.SEND_DOCUMENT_QUERY:
      return { query: action.sendDocument.query };
    case actions.sendDocument.SEND_DOCUMENT_RESULT:
      return { query: state.query, result: action.sendDocument.result };
    default:
      return state;
  }
};

export { sendDocument };
