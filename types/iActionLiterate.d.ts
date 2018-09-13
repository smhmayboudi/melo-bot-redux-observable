import { Action } from "redux";
import { IStateLiterate } from "./iStateLiterate";

export interface IActionLiterate extends Action<string> {
  literate: IStateLiterate;
}