import { IInputFile } from "./iInputFile";
import { IInputMedia } from "./iInputMedia";

export interface IInputMediaVideo extends IInputMedia {
  duration?: number;
  height?: number;
  supports_streaming?: boolean;
  thumb?: IInputFile | string;
  width?: number;
}