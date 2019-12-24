import { IActionUndo } from "../../types/iActionUndo";
import { IStateUndo } from "../../types/iStateUndo";

const initialState: IStateUndo<any> = {
  future: [],
  past: [],
  present: {}
};

const UNDO_CLEAR = "UNDO_CLEAR";
const UNDO_JUMP = "UNDO_JUMP";
const UNDO_JUMP_TO_FUTURE = "UNDO_JUMP_TO_FUTURE";
const UNDO_JUMP_TO_PAST = "UNDO_JUMP_TO_PAST";
const UNDO_REDO = "UNDO_REDO";
const UNDO_UNDO = "UNDO_UNDO";

const clear: () => IActionUndo = (): IActionUndo => ({
  undo: {
    index: 0
  },
  type: UNDO_CLEAR
});
const jump: (index: number) => IActionUndo = (index: number): IActionUndo => ({
  undo: {
    index
  },
  type: UNDO_JUMP
});
const jumpToFuture: (index: number) => IActionUndo = (
  index: number
): IActionUndo => ({
  undo: {
    index
  },
  type: UNDO_JUMP_TO_FUTURE
});
const jumpToPast: (index: number) => IActionUndo = (
  index: number
): IActionUndo => ({
  undo: {
    index
  },
  type: UNDO_JUMP_TO_PAST
});
const redo: () => IActionUndo = (): IActionUndo => ({
  undo: {
    index: 1
  },
  type: UNDO_REDO
});
const undo: () => IActionUndo = (): IActionUndo => ({
  undo: {
    index: -1
  },
  type: UNDO_UNDO
});

export {
  initialState,
  UNDO_CLEAR,
  UNDO_JUMP,
  UNDO_JUMP_TO_FUTURE,
  UNDO_JUMP_TO_PAST,
  UNDO_REDO,
  UNDO_UNDO,
  clear,
  jump,
  jumpToFuture,
  jumpToPast,
  redo,
  undo
};
