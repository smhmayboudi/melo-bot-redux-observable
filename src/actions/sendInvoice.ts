import { IActionSendInvoice } from "../../types/iActionSendInvoice";
import { IStateSendInvoice } from "../../types/iStateSendInvoice";

const initialState: IStateSendInvoice = {};

const SEND_INVOICE_ERROR = "SEND_INVOICE_ERROR";
const SEND_INVOICE_QUERY = "SEND_INVOICE_QUERY";
const SEND_INVOICE_RESULT = "SEND_INVOICE_RESULT";

const error: (sendInvoice: IStateSendInvoice) => IActionSendInvoice = (
  sendInvoice: IStateSendInvoice
): IActionSendInvoice => ({
  sendInvoice: {
    error: sendInvoice.error
  },
  type: SEND_INVOICE_ERROR
});
const query: (sendInvoice: IStateSendInvoice) => IActionSendInvoice = (
  sendInvoice: IStateSendInvoice
): IActionSendInvoice => ({
  sendInvoice: {
    query: sendInvoice.query
  },
  type: SEND_INVOICE_QUERY
});
const result: (sendInvoice: IStateSendInvoice) => IActionSendInvoice = (
  sendInvoice: IStateSendInvoice
): IActionSendInvoice => ({
  sendInvoice: {
    result: sendInvoice.result
  },
  type: SEND_INVOICE_RESULT
});

export {
  initialState,
  SEND_INVOICE_ERROR,
  SEND_INVOICE_QUERY,
  SEND_INVOICE_RESULT,
  error,
  query,
  result
};
