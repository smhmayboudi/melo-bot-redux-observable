import { IActionSendContact } from "../../types/iActionSendContact";
import { IStateSendContact } from "../../types/iStateSendContact";

const initialState: IStateSendContact = {};

const SEND_CONTACT_ERROR = "SEND_CONTACT_ERROR";
const SEND_CONTACT_QUERY = "SEND_CONTACT_QUERY";
const SEND_CONTACT_RESULT = "SEND_CONTACT_RESULT";

const error: (sendContact: IStateSendContact) => IActionSendContact = (
  sendContact: IStateSendContact
): IActionSendContact => ({
  sendContact: { error: sendContact.error },
  type: SEND_CONTACT_ERROR
});
const query: (sendContact: IStateSendContact) => IActionSendContact = (
  sendContact: IStateSendContact
): IActionSendContact => ({
  sendContact: { query: sendContact.query },
  type: SEND_CONTACT_QUERY
});
const result: (sendContact: IStateSendContact) => IActionSendContact = (
  sendContact: IStateSendContact
): IActionSendContact => ({
  sendContact: { result: sendContact.result },
  type: SEND_CONTACT_RESULT
});

export {
  initialState,
  SEND_CONTACT_ERROR,
  SEND_CONTACT_QUERY,
  SEND_CONTACT_RESULT,
  error,
  query,
  result
};
