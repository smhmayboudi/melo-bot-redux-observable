import { IStateSendVideoNoteQuery } from "./iStateSendVideoNoteQuery";

export interface IStateSendVideoNote {
  error?: any;
  query?: IStateSendVideoNoteQuery;
  // TODO: check it
  result?: boolean;
}
