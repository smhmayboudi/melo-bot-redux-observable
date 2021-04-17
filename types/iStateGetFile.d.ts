import { IStateGetFileQuery } from "./iStateGetFileQuery";
import { IFile } from "./telegramBot/types/iFile";

export interface IStateGetFile {
  error?: any;
  query?: IStateGetFileQuery;
  result?: IFile;
}
