import { Store } from "redux";
import { Observable, of } from "rxjs";
import { IState } from "../../types/iState";
import { IStateLiterate } from "../../types/iStateLiterate";
import { IStateMessage } from "../../types/iStateMessage";
import * as actions from "../actions";
import { configureStore } from "./store";

describe("store config", (): void => {

  const initalStateh: IState = {
    getChatMember: actions.getChatMember.initalState,
    literate: actions.literate.initalState,
    message: actions.message.initalState,
    sendAudio: actions.sendAudio.initalState,
    sendMessage: actions.sendMessage.initalState,
    sendVideo: actions.sendVideo.initalState,
    youtubeDownload: actions.youtubeDownload.initalState,
    youtubeSearchList: actions.youtubeSearchList.initalState,
    youtubeVideoList: actions.youtubeVideoList.initalState,
  };
  let message: IStateMessage = {
    query: {
      message: {
        chat: {
          first_name: "Hossein",
          id: 52953379,
          last_name: "Mayboudi",
          type: "private",
          username: "smhmayboudi",
        },
        date: 1537627954,
        entities: [
          {
            length: 9,
            offset: 0,
            type: "bot_command",
          },
        ],
        from: {
          first_name: "Hossein",
          id: 52953379,
          is_bot: false,
          language_code: "en-CA",
          last_name: "Mayboudi",
          username: "smhmayboudi",
        },
        message_id: 1164,
        text: "",
      },
      update_id: 0,
    },
  };

  // Const literateError: Error = new Error("");
  const literateQuery: string = "HI";
  const literateResult: string = "های";

  test("should handle start message", (): void => {
    if (message.query !== undefined && message.query.message !== undefined) {
      message = {
        query: {
          ...message.query,
          message: { ...message.query.message, text: "/start" },
        },
      };
    }
    const store: (Store<IState> & { dispatch: {} }) = configureStore();
    store.dispatch(actions.message.query(message));
    expect(store.getState())
      .toEqual({
        ...initalStateh,
        message,
      });
  });

  test("should handle literate message", (): void => {
    if (message.query !== undefined && message.query.message !== undefined) {
      message = {
        query: {
          ...message.query,
          message: { ...message.query.message, text: "/literate" },
        },
      };
    }
    const store: (Store<IState> & { dispatch: {} }) = configureStore({
      requestObservable: (): Observable<IStateLiterate> => of({ query: literateQuery, result: literateResult }),
    });
    store.dispatch(actions.message.query(message));
    store.dispatch(actions.literate.query({ query: literateQuery }));
    expect(store.getState())
      .toEqual({
        ...initalStateh,
        literate: { query: literateQuery, result: literateResult },
        message,
      });
  });

});
