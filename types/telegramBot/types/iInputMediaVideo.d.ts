import { IInputFile } from "./iInputFile";

export interface IInputMediaVideo {
  caption?: string;
  duration?: number;
  height?: number;
  media: string;
  parse_mode?: string;
  supports_streaming?: boolean;
  thumb?: IInputFile | string;
  type: string;
  width?: number;
}