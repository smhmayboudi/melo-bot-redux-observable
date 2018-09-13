import { IInputFile } from "./iInputFile";

export interface IInputMediaAudio {
  caption?: string;
  duration?: number;
  media: string;
  parse_mode?: string;
  performer?: string;
  thumb?: IInputFile | string;
  title?: string;
  type: string;
}