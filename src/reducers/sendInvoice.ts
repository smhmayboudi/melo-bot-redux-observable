import { IActionSendInvoice } from "../../types/iActionSendInvoice";
import { IStateSendInvoice } from "../../types/iStateSendInvoice";
import * as actions from "../actions";

const sendInvoice: (
  state: IStateSendInvoice | undefined,
  action: IActionSendInvoice
) => IStateSendInvoice = (
  state: IStateSendInvoice | undefined = actions.sendInvoice.initialState,
  action: IActionSendInvoice
): IStateSendInvoice => {
  switch (action.type) {
    case actions.sendInvoice.SEND_INVOICE_ERROR:
      return { ...state, error: action.sendInvoice.error };
    case actions.sendInvoice.SEND_INVOICE_QUERY:
      return { ...state, query: action.sendInvoice.query };
    case actions.sendInvoice.SEND_INVOICE_RESULT:
      return { ...state, result: action.sendInvoice.result };
    default:
      return state;
  }
};

export { sendInvoice };
