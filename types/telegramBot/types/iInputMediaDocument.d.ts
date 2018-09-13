import { IInputFile } from "./iInputFile";

export interface IInputMediaDocument {
  caption?: string;
  media: string;
  parse_mode?: string;
  thumb?: IInputFile | string;
  type: string;
}