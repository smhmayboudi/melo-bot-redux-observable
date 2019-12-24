import * as action from "./undo";

describe("undo actions", (): void => {
  test("should handle clear", (): void => {
    expect(action.clear()).toEqual({
      undo: {
        index: 0
      },
      type: action.UNDO_CLEAR
    });
  });

  test("should handle jump", (): void => {
    expect(action.jump(0)).toEqual({
      undo: {
        index: 0
      },
      type: action.UNDO_JUMP
    });
  });

  test("should handle jumpToFuture", (): void => {
    expect(action.jumpToFuture(0)).toEqual({
      undo: {
        index: 0
      },
      type: action.UNDO_JUMP_TO_FUTURE
    });
  });

  test("should handle jumpToPast", (): void => {
    expect(action.jumpToPast(0)).toEqual({
      undo: {
        index: 0
      },
      type: action.UNDO_JUMP_TO_PAST
    });
  });

  test("should handle redo", (): void => {
    expect(action.redo()).toEqual({
      undo: {
        index: 1
      },
      type: action.UNDO_REDO
    });
  });

  test("should handle undo", (): void => {
    expect(action.undo()).toEqual({
      undo: {
        index: -1
      },
      type: action.UNDO_UNDO
    });
  });
});
