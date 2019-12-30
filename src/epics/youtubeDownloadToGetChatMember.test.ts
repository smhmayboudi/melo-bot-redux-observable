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
import { StateObservable } from "redux-observable";
import { Observable, of, Subject } from "rxjs";

import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as env from "../configs/env";
import { init as initDependencies } from "../utils/dependencies";
import { initialState } from "../utils/store";
import { locale } from "../utils/string";
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

    let mariaClient: Connection;
    let mongoClient: MongoClient;
    let locales: ILocale;

    afterAll(
      async (): Promise<void> => {
        await mongoClient.close();
      }
    );

    beforeAll(
      async (): Promise<void> => {
        mariaClient = await createConnection("");
        mongoClient = await MongoClient.connect(global.__MONGO_URI__, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        locales = await locale("en");
      }
    );

    test("should handle error state$ undefined", (): void => {
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true)
      };
      expect(startAction(state$, dependencies)).toEqual(
        actions.youtubeDownload.error({
          error: new Error(locales.find("state$Undefined"))
        })
      );
    });

    test("should handle error state$ValueMessageQuery undefined", (): void => {
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryUndefined
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true)
      };
      expect(startAction(state$, dependencies)).toEqual(
        actions.youtubeDownload.error({
          error: new Error(locales.find("state$ValueMessageQueryUndefined"))
        })
      );
    });

    test("should handle error state$ValueMessageQuery undefined", (): void => {
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryMessageUndefined
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true)
      };
      expect(startAction(state$, dependencies)).toEqual(
        actions.youtubeDownload.error({
          error: new Error(
            locales.find("state$ValueMessageQueryMessageUndefined")
          )
        })
      );
    });

    test("should handle result", (): void => {
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true)
      };
      expect(startAction(state$, dependencies)).toEqual(
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
