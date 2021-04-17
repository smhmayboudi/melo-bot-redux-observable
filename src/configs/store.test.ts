declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_DB_NAME__: string;
      __MONGO_URI__: string;
    }
  }
}

import { Connection, createConnection } from "mariadb";
import { MongoClient } from "mongodb";
import { Store } from "redux";

import { IAction } from "../../types/iAction";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateMessage } from "../../types/iStateMessage";
import * as actions from "../actions";
import * as env from "../configs/env";
import { initialState } from "../utils/store";
import { locale } from "../utils/string";
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
          language_code: "en",
          last_name: "Mayboudi",
          username: "smhmayboudi"
        },
        message_id: 1164,
        text: ""
      },
      update_id: 0
    }
  };

  let locales: ILocale;
  let mariaClient: Connection;
  let mongoClient: MongoClient;

  afterAll(
    async (): Promise<void> => {
      await mongoClient.close();
    }
  );

  beforeAll(
    async (): Promise<void> => {
      locales = await locale("en");
      mariaClient = await createConnection(env.MARIA_CLIENT_URI);
      mongoClient = await MongoClient.connect(global.__MONGO_URI__, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }
  );

  test("should handle start message", (): void => {
    if (message.query !== undefined && message.query.message !== undefined) {
      message = {
        query: {
          ...message.query,
          message: { ...message.query.message, text: "/start" }
        }
      };
    }
    const store: Store<IState, IAction> = configureStore(
      {
        future: [],
        past: [],
        present: {},
        userId: 0
      },
      locales,
      mariaClient,
      mongoClient
    );
    store.dispatch(actions.message.query(message));
    expect(store.getState()).toEqual({
      ...initialState,
      message
    });
  });
});
