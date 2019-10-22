import { Action } from "redux";

import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import * as actions from "../actions";

import { crashReporter } from "./crashReporter";

describe("crashReporter middleware", (): void => {
  const initialStateh: IState = {
    answerInlineQuery: actions.answerInlineQuery.initialState,
    getChatMember: actions.getChatMember.initialState,
    inlineQuery: actions.inlineQuery.initialState,
    literate: actions.literate.initialState,
    message: actions.message.initialState,
    sendAudio: actions.sendAudio.initialState,
    sendMessage: actions.sendMessage.initialState,
    sendVideo: actions.sendVideo.initialState,
    youtubeDownload: actions.youtubeDownload.initialState,
    youtubeSearchList: actions.youtubeSearchList.initialState,
    youtubeVideoList: actions.youtubeVideoList.initialState
  };
  const query: IStateMessageQuery = {
    message: {
      chat: {
        first_name: "Hossein",
        id: 52953379,
        last_name: "Mayboudi",
        type: "private",
        username: "smhmayboudi"
      },
      date: 1537627954,
      entities: [
        {
          length: 9,
          offset: 0,
          type: "bot_command"
        }
      ],
      from: {
        first_name: "Hossein",
        id: 52953379,
        is_bot: false,
        language_code: "fa",
        last_name: "Mayboudi",
        username: "smhmayboudi"
      },
      message_id: 1164,
      text: ""
    },
    update_id: 0
  };
  const queryFrom: IStateMessageQuery = {
    message: {
      chat: {
        first_name: "Hossein",
        id: 52953379,
        last_name: "Mayboudi",
        type: "private",
        username: "smhmayboudi"
      },
      date: 1537627954,
      entities: [
        {
          length: 9,
          offset: 0,
          type: "bot_command"
        }
      ],
      from: undefined,
      message_id: 1164,
      text: ""
    },
    update_id: 0
  };

  const create: (
    getState: jest.Mock,
    error?: () => void
  ) => {
    next: jest.Mock;
    store: {
      dispatch: jest.Mock;
      getState: jest.Mock;
    };
    invoke(action: Action<string>): Action<string>;
  } = (
    getState: jest.Mock,
    error?: () => void
  ): {
    next: jest.Mock;
    store: {
      dispatch: jest.Mock;
      getState: jest.Mock;
    };
    invoke(action: Action<string>): Action<string>;
  } => {
    const store: {
      dispatch: jest.Mock;
      getState: jest.Mock;
    } = {
      dispatch: jest.fn(),
      getState
    };
    const next: jest.Mock = jest.fn(error);
    const invoke: (action: Action<string>) => Action<string> = (
      action: Action<string>
    ): Action<string> => crashReporter(store)(next)(action);

    return { invoke, next, store };
  };

  test("should handle", (): void => {
    const { invoke, next } = create(jest.fn(() => initialStateh));
    const action: Action<string> = { type: "" };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  test("should handle exception action", (): void => {
    const error: Error = new Error("");
    const { next, invoke } = create(jest.fn(() => initialStateh), (): void => {
      throw error;
    });
    const action: Action<string> = actions.message.query({ query });
    try {
      invoke(action);
    } catch {
      expect(next).toThrow(error);
    }
  });

  test("should handle exception state from undefined", (): void => {
    const error: Error = new Error("");
    const { next, invoke } = create(
      jest.fn(() => ({ ...initialStateh, message: { queryFrom } })),
      (): void => {
        throw error;
      }
    );
    const action: Action<string> = { type: "" };
    try {
      invoke(action);
    } catch {
      expect(next).toThrow(error);
    }
  });

  test("should handle exception state", (): void => {
    const error: Error = new Error("");
    const { next, invoke } = create(
      jest.fn(() => ({ ...initialStateh, message: { query } })),
      (): void => {
        throw error;
      }
    );
    const action: Action<string> = { type: "" };
    try {
      invoke(action);
    } catch {
      expect(next).toThrow(error);
    }
  });
});
