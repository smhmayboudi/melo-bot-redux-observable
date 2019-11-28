import { Subject, of } from "rxjs";
import { StateObservable } from "redux-observable";

import { initialState } from "../utils/store";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IStateYoutubeDownloadQuery } from "../../types/iStateYoutubeDownloadQuery";
import { transformObservable } from "./youtubeDownloadToSendMessage";
import { IMessage } from "../../types/telegramBot/types/iMessage";

describe("youtubeDownload epic", (): void => {
  describe("youtubeDownloadToSendMessage", (): void => {
    const error: Error = new Error("");
    const query: IStateYoutubeDownloadQuery = {
      id: ""
    };
    // const result: IStateYoutubeDownloadResultInsertQuery = {};
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

    test("should handle error", (): void => {
      const action: IActionYoutubeDownload = actions.youtubeDownload.error({
        error
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      expect(transformObservable(action, state$)).toEqual(of(action));
    });

    test("should handle error state$ undefined", (): void => {
      const action: IActionYoutubeDownload = actions.youtubeDownload.query({
        query
      });
      const state$: StateObservable<IState> | undefined = undefined;
      expect(transformObservable(action, state$)).toEqual(
        of(
          actions.youtubeDownload.error({
            error: new Error(texts.state$Undefined)
          })
        )
      );
    });

    test("should handle error state$ValueMessageQuery undefined", (): void => {
      const action: IActionYoutubeDownload = actions.youtubeDownload.query({
        query
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryUndefined
      );
      expect(transformObservable(action, state$)).toEqual(
        of(
          actions.youtubeDownload.error({
            error: new Error(texts.state$ValueMessageQueryUndefined)
          })
        )
      );
    });

    test("should handle error state$ValueMessageQueryMessage undefined", (): void => {
      const action: IActionYoutubeDownload = actions.youtubeDownload.query({
        query
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryMessageUndefined
      );
      expect(transformObservable(action, state$)).toEqual(
        of(
          actions.youtubeDownload.error({
            error: new Error(texts.state$ValueMessageQueryMessageUndefined)
          })
        )
      );
    });

    test("should handle result", (): void => {
      const action: IActionYoutubeDownload = actions.youtubeDownload.query({
        query
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      expect(transformObservable(action, state$)).toEqual(
        of(
          actions.sendMessage.query({
            query: {
              chat_id: ((state$Value.message.query as IStateMessageQuery)
                .message as IMessage).chat.id,
              disable_notification: true,
              disable_web_page_preview: true,
              parse_mode: "HTML",
              reply_to_message_id: ((state$Value.message
                .query as IStateMessageQuery).message as IMessage).message_id,
              text: texts.messageChannelJoin
            }
          })
        )
      );
    });
  });
});
