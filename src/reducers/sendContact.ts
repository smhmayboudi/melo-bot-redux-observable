import { IActionSendContact } from "../../types/iActionSendContact";
import { IStateSendContact } from "../../types/iStateSendContact";
import * as actions from "../actions";

const sendContact: (
  state: IStateSendContact | undefined,
  action: IActionSendContact
) => IStateSendContact = (
  state: IStateSendContact | undefined = actions.sendContact.initialState,
  action: IActionSendContact
): IStateSendContact => {
  switch (action.type) {
    case actions.sendContact.SEND_CONTACT_ERROR:
      return { ...state, error: action.sendContact.error };
    case actions.sendContact.SEND_CONTACT_QUERY:
      return { ...state, query: action.sendContact.query };
    case actions.sendContact.SEND_CONTACT_RESULT:
      return { ...state, result: action.sendContact.result };
    default:
      return state;
  }
};

export { sendContact };
