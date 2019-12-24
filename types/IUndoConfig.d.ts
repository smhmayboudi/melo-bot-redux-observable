import { IAction } from "./iAction";
import { IStateUndo } from "./iStateUndo";

export interface IUndoConfig<T> {
  initTypes: string[];
  limit: number;
  filter: (action: IAction, present: T, stateUndo: IStateUndo<T>) => boolean;
  groupBy: (
    action: IAction,
    present: T,
    stateUndo: IStateUndo<T>
  ) => string | undefined;
  undoType: string;
  redoType: string;
  jumpToPastType: string;
  jumpToFutureType: string;
  jumpType: string;
  clearTypes: string[];
  neverSkipReducer: boolean;
  ignoreInitialState: boolean;
  syncFilter: boolean;
  initialState: IStateUndo<T>;
}
