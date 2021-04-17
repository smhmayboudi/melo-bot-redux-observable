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
      return { ...state, error: action.sendDocument.error };
    case actions.sendDocument.SEND_DOCUMENT_QUERY:
      return { ...state, query: action.sendDocument.query };
    case actions.sendDocument.SEND_DOCUMENT_RESULT:
      return { ...state, result: action.sendDocument.result };
    default:
      return state;
  }
};

export { sendDocument };
