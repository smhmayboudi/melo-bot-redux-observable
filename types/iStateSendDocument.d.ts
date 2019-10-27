import { IStateSendDocumentQuery } from "./iStateSendDocumentQuery";

export interface IStateSendDocument {
  error?: any;
  query?: IStateSendDocumentQuery;
  // TODO: check it
  result?: boolean;
}
