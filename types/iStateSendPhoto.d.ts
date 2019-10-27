import { IStateSendPhotoQuery } from "./iStateSendPhotoQuery";

export interface IStateSendPhoto {
  error?: any;
  query?: IStateSendPhotoQuery;
  // TODO: check it
  result?: boolean;
}
