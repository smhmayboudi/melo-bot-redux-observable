import { IActionSendDocument } from "../../types/iActionSendDocument";
import { IStateSendDocument } from "../../types/iStateSendDocument";

const initialState: IStateSendDocument = {};

const SEND_DOCUMENT_ERROR = "SEND_DOCUMENT_ERROR";
const SEND_DOCUMENT_QUERY = "SEND_DOCUMENT_QUERY";
const SEND_DOCUMENT_RESULT = "SEND_DOCUMENT_RESULT";

const error: (sendDocument: IStateSendDocument) => IActionSendDocument = (
  sendDocument: IStateSendDocument
): IActionSendDocument => ({
  sendDocument: { error: sendDocument.error },
  type: SEND_DOCUMENT_ERROR
});
const query: (sendDocument: IStateSendDocument) => IActionSendDocument = (
  sendDocument: IStateSendDocument
): IActionSendDocument => ({
  sendDocument: { query: sendDocument.query },
  type: SEND_DOCUMENT_QUERY
});
const result: (sendDocument: IStateSendDocument) => IActionSendDocument = (
  sendDocument: IStateSendDocument
): IActionSendDocument => ({
  sendDocument: { result: sendDocument.result },
  type: SEND_DOCUMENT_RESULT
});

export {
  initialState,
  SEND_DOCUMENT_ERROR,
  SEND_DOCUMENT_QUERY,
  SEND_DOCUMENT_RESULT,
  error,
  query,
  result
};
