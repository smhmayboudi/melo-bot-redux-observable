import { IInputFile } from "./iInputFile";
import { IInputMedia } from "./iInputMedia";

export interface IInputMediaAnimation extends IInputMedia {
  duration?: number;
  height?: number;
  thumb?: IInputFile | string;
  width?: number;
}
