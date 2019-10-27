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
      return { error: action.sendInvoice.error, query: state.query };
    case actions.sendInvoice.SEND_INVOICE_QUERY:
      return { query: action.sendInvoice.query };
    case actions.sendInvoice.SEND_INVOICE_RESULT:
      return { query: state.query, result: action.sendInvoice.result };
    default:
      return state;
  }
};

export { sendInvoice };
