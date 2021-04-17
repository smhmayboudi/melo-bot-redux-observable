import { IInputFile } from "./iInputFile";

export interface IInputMedia {
  caption?: string;
  media: IInputFile | string;
  parse_mode?: string;
  type: string;
}
