import { StateObservable } from "redux-observable";
import { Subject } from "rxjs";

import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as env from "../configs/env";
import * as texts from "../configs/texts";
import { initialState } from "../utils/store";
import { startAction } from "./youtubeDownloadToGetChatMember";

describe("youtubeDownload epic", (): void => {
  describe("youtubeDownloadToGetChatMember", (): void => {
    const state$Value: IState = {
      ...initialState,
      message: {
        query: {
          message: {
            chat: {
              id: 0,
              type: ""
            },
            date: 0,
            message_id: 0
          },
          update_id: 0
        }
      }
    };
    const state$ValueMessageQueryUndefined: IState = {
      ...state$Value,
      message: {
        ...state$Value.message,
        query: undefined
      }
    };
    const state$ValueMessageQueryMessageUndefined: IState = {
      ...state$Value,
      message: {
        ...state$Value.message,
        query: {
          ...(state$Value.message.query as IStateMessageQuery),
          message: undefined
        }
      }
    };

    test("should handle error state$ undefined", (): void => {
      const state$: StateObservable<IState> | undefined = undefined;
      expect(startAction(state$)).toEqual(
        actions.youtubeDownload.error({
          error: new Error(texts.state$Undefined)
        })
      );
    });

    test("should handle error state$ValueMessageQuery undefined", (): void => {
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryUndefined
      );
      expect(startAction(state$)).toEqual(
        actions.youtubeDownload.error({
          error: new Error(texts.state$ValueMessageQueryUndefined)
        })
      );
    });

    test("should handle error state$ValueMessageQuery undefined", (): void => {
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryMessageUndefined
      );
      expect(startAction(state$)).toEqual(
        actions.youtubeDownload.error({
          error: new Error(texts.state$ValueMessageQueryMessageUndefined)
        })
      );
    });

    test("should handle result", (): void => {
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      expect(startAction(state$)).toEqual(
        actions.getChatMember.query({
          query: {
            chat_id: `@${env.CHANNEL}`,
            user_id: ((state$Value.message.query as IStateMessageQuery)
              .message as IMessage).chat.id
          }
        })
      );
    });
  });
});
