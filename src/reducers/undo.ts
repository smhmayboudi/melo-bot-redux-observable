import { Reducer } from "redux";

import { IAction } from "../../types/iAction";
import { IStateUndo } from "../../types/iStateUndo";
import { IUndoConfig } from "../../types/IUndoConfig";
import { IUndoRawConfig } from "../../types/IUndoRawConfig";
import * as actions from "../actions";

const newState: <T>(
  past: T[],
  present: T,
  future: T[],
  group?: string
) => IStateUndo<T> = <T>(
  past: T[],
  present: T,
  future: T[],
  group?: string
): IStateUndo<T> => ({
  _latestUnfiltered: present,
  future,
  group,
  index: past.length,
  limit: past.length + future.length + 1,
  past,
  present
});

const insertState: <T>(
  stateUndo: IStateUndo<T>,
  stateCommandUI: T,
  limit: number,
  group?: string
) => IStateUndo<T> = <T>(
  stateUndo: IStateUndo<T>,
  stateCommandUI: T,
  limit: number,
  group?: string
): IStateUndo<T> => {
  const { past, _latestUnfiltered } = stateUndo;
  const historyOverflow: boolean = stateUndo.past.length + 1 >= limit;

  const pastSliced: T[] = past.slice(historyOverflow ? 1 : 0);
  const newPast: T[] =
    _latestUnfiltered != undefined
      ? [...pastSliced, _latestUnfiltered]
      : pastSliced;

  return newState(newPast, stateCommandUI, [], group);
};

const createState: <T>(
  stateCommandUI: T,
  ignoreInitialState: boolean
) => IStateUndo<T> = <T>(
  stateCommandUI: T,
  ignoreInitialState: boolean
): IStateUndo<T> => {
  const stateUndo: IStateUndo<T> = newState([], stateCommandUI, []);
  if (ignoreInitialState) {
    stateUndo._latestUnfiltered = undefined;
  }

  return stateUndo;
};

const jumpToFuture: <T>(
  stateUndo: IStateUndo<T>,
  index: number
) => IStateUndo<T> = <T>(
  stateUndo: IStateUndo<T>,
  index: number
): IStateUndo<T> => {
  if (index < 0 || index >= stateUndo.future.length) {
    return stateUndo;
  }

  const { past, future, _latestUnfiltered } = stateUndo;

  const newPast: T[] =
    _latestUnfiltered != undefined
      ? [...past, _latestUnfiltered, ...future.slice(0, index)]
      : [...past, ...future.slice(0, index)];
  const newPresent: T = future[index];
  const newFuture: T[] = future.slice(index + 1);

  return newState(newPast, newPresent, newFuture);
};

const jumpToPast: <T>(
  stateUndo: IStateUndo<T>,
  index: number
) => IStateUndo<T> = <T>(
  stateUndo: IStateUndo<T>,
  index: number
): IStateUndo<T> => {
  if (index < 0 || index >= stateUndo.past.length) {
    return stateUndo;
  }

  const { past, future, _latestUnfiltered } = stateUndo;

  const newPast: T[] = past.slice(0, index);
  const newFuture: T[] =
    _latestUnfiltered !== undefined
      ? [...past.slice(index + 1), _latestUnfiltered, ...future]
      : [...past.slice(index + 1), ...future];
  const newPresent: T = past[index];

  return newState(newPast, newPresent, newFuture);
};

const jump: <T>(stateUndo: IStateUndo<T>, index: number) => IStateUndo<T> = <T>(
  stateUndo: IStateUndo<T>,
  index: number
): IStateUndo<T> => {
  if (index > 0) {
    return jumpToFuture(stateUndo, index - 1);
  } else if (index < 0) {
    return jumpToPast(stateUndo, stateUndo.past.length + index);
  }
  return stateUndo;
};

const actionTypeAmongClearTypes = (
  actionType: string,
  clearTypes: string[]
): string => (clearTypes.indexOf(actionType) > -1 ? actionType : "");

const undo: <T>(
  reducer: Reducer<T, any>,
  rawConfig?: IUndoRawConfig<T>
) => Reducer<IStateUndo<T>, IAction> = <T>(
  reducer: Reducer<T, any>,
  rawConfig?: IUndoRawConfig<T>
): Reducer<IStateUndo<T>, IAction> => {
  const config: IUndoConfig<T> = {
    initTypes: (rawConfig && rawConfig.initTypes) || ["@@redux-undo/INIT"],
    limit: (rawConfig && rawConfig.limit) || 10,
    filter: (rawConfig && rawConfig.filter) || ((): boolean => true),
    groupBy: (rawConfig && rawConfig.groupBy) || ((): undefined => undefined),
    undoType: (rawConfig && rawConfig.undoType) || actions.undo.UNDO_UNDO,
    redoType: (rawConfig && rawConfig.redoType) || actions.undo.UNDO_REDO,
    jumpToPastType:
      (rawConfig && rawConfig.jumpToPastType) || actions.undo.UNDO_JUMP_TO_PAST,
    jumpToFutureType:
      (rawConfig && rawConfig.jumpToFutureType) ||
      actions.undo.UNDO_JUMP_TO_FUTURE,
    jumpType: (rawConfig && rawConfig.jumpType) || actions.undo.UNDO_JUMP,
    clearTypes: (rawConfig && rawConfig.clearTypes) || [
      actions.undo.UNDO_CLEAR
    ],
    neverSkipReducer: (rawConfig && rawConfig.neverSkipReducer) || false,
    ignoreInitialState: (rawConfig && rawConfig.ignoreInitialState) || false,
    syncFilter: (rawConfig && rawConfig.syncFilter) || false,
    initialState:
      (rawConfig && rawConfig.initialState) || actions.undo.initialState
  };

  let initialState: IStateUndo<T> = config.initialState;

  return (
    state: IStateUndo<T> | undefined = initialState,
    action: IAction
  ): IStateUndo<T> => {
    let stateUndo: IStateUndo<T> = state;

    stateUndo = initialState = config.ignoreInitialState
      ? state
      : newState(state.past, state.present, state.future);

    const skipReducer: (sta: IStateUndo<T>) => IStateUndo<T> = (
      sta: IStateUndo<T>
    ): IStateUndo<T> =>
      config.neverSkipReducer
        ? {
            ...sta,
            present: reducer(sta.present, action)
          }
        : sta;

    switch (action.type) {
      case actionTypeAmongClearTypes(action.type, config.clearTypes):
        return skipReducer(
          createState(stateUndo.present, config.ignoreInitialState)
        );
      case config.jumpType:
        return skipReducer(
          jump(stateUndo, action.undo ? action.undo.index : 0)
        );
      case config.jumpToFutureType:
        return skipReducer(
          jumpToFuture(stateUndo, action.undo ? action.undo.index : 0)
        );
      case config.jumpToPastType:
        return skipReducer(
          jumpToPast(stateUndo, action.undo ? action.undo.index : 0)
        );
      case config.redoType:
        return skipReducer(jump(stateUndo, 1));
      case config.undoType:
        return skipReducer(jump(stateUndo, -1));
      default: {
        const newPresent: T = reducer(stateUndo.present, action);

        if (
          config.initTypes.some(
            (actionType: string): boolean => actionType === action.type
          )
        ) {
          return initialState;
        }

        if (stateUndo._latestUnfiltered === newPresent) {
          return stateUndo;
        }

        const filtered = !config.filter(action, newPresent, stateUndo);
        if (filtered) {
          const filteredStateUndo: IStateUndo<T> = newState(
            stateUndo.past,
            newPresent,
            stateUndo.future,
            stateUndo.group
          );
          if (!config.syncFilter) {
            filteredStateUndo._latestUnfiltered = stateUndo._latestUnfiltered;
          }

          return filteredStateUndo;
        }

        const group: string | undefined = config.groupBy(
          action,
          newPresent,
          stateUndo
        );
        if (group != undefined && group === stateUndo.group) {
          const groupedState: IStateUndo<T> = newState(
            stateUndo.past,
            newPresent,
            stateUndo.future,
            stateUndo.group
          );

          return groupedState;
        }

        return insertState(stateUndo, newPresent, config.limit, group);
      }
    }
  };
};

export { undo };
