import { IAction } from "./iAction";
// import { IStateUndo } from "./iStateUndo";

export interface IActionUndo extends IAction {
  // undo: IStateUndo;
  undo: {
    index: number;
  };
}
