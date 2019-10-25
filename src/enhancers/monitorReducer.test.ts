import { Action } from "redux";

import { IState } from "../../types/iState";
import * as actions from "../actions";

import { monitorReducer } from "./monitorReducer";

describe("monitorReducer middleware", (): void => {
  const initialStateh: IState = {
    answerInlineQuery: actions.answerInlineQuery.initialState,
    chosenInlineResult: actions.chosenInlineResult.initialState,
    getChatMember: actions.getChatMember.initialState,
    inlineQuery: actions.inlineQuery.initialState,
    message: actions.message.initialState,
    sendAudio: actions.sendAudio.initialState,
    sendMessage: actions.sendMessage.initialState,
    sendVideo: actions.sendVideo.initialState,
    youtubeDownload: actions.youtubeDownload.initialState,
    youtubeSearchList: actions.youtubeSearchList.initialState,
    youtubeVideoList: actions.youtubeVideoList.initialState
  };
  const create: () => {
    next: jest.Mock;
    store: {
      dispatch: jest.Mock;
      getState: jest.Mock;
    };
  } = (): {
    next: jest.Mock;
    store: {
      dispatch: jest.Mock;
      getState: jest.Mock;
    };
  } => {
    const store: {
      dispatch: jest.Mock;
      getState: jest.Mock;
    } = {
      dispatch: jest.fn(),
      getState: jest.fn(() => initialStateh)
    };
    const next: jest.Mock = jest.fn();
    next(monitorReducer, initialStateh);

    return { next, store };
  };

  test("should handle", (): void => {
    const { next } = create();
    const action: Action<string> = { type: "" };
    expect(next).toHaveBeenCalledWith(action);
  });
});
