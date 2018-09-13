import { IInputFile } from "./iInputFile";

export interface IInputMediaAnimation {
  caption?: string;
  duration?: number;
  height?: number;
  media: string;
  parse_mode?: string;
  thumb?: IInputFile | string,
  type: string;
  width?: number;
}