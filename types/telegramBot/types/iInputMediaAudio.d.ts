import { IInputFile } from "./iInputFile";
import { IInputMedia } from "./iInputMedia";

export interface IInputMediaAudio extends IInputMedia {
  duration?: number;
  performer?: string;
  thumb?: IInputFile | string;
  title?: string;
}
