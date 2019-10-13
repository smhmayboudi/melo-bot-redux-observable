import { IInputFile } from "./iInputFile";
import { IInputMedia } from "./iInputMedia";

export interface IInputMediaDocument extends IInputMedia {
  thumb?: IInputFile | string;
}