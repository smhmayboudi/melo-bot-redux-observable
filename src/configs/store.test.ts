import { Store } from "redux";

import { initialState } from "../utils/store";
import { IAction } from "../../types/iAction";
import { IState } from "../../types/iState";
import { IStateMessage } from "../../types/iStateMessage";
import * as actions from "../actions";

import { configureStore } from "./store";

describe("store configs", (): void => {
  let message: IStateMessage = {
    query: {
      message: {
        chat: {
          first_name: "Hossein",
          id: 52953379,
          last_name: "Mayboudi",
          type: "",
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
    }
  };

  test("should handle start message", (): void => {
    if (message.query !== undefined && message.query.message !== undefined) {
      message = {
        query: {
          ...message.query,
          message: { ...message.query.message, text: "/start" }
        }
      };
    }
    const store: Store<IState, IAction> = configureStore();
    store.dispatch(actions.message.query(message));
    expect(store.getState()).toEqual({
      ...initialState,
      message
    });
  });
});
