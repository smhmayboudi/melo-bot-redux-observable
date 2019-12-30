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

import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import * as env from "../configs/env";
import { init } from "./dependencies";
import { locale } from "./string";

describe("dependencies utils", (): void => {
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

  test("should handle initDependencies", (): void => {
    const initDependencies: IDependencies = init(
      locales,
      mariaClient,
      mongoClient
    );
    expect("authorization" in initDependencies).toBeTruthy();
    expect("botToken" in initDependencies).toBeTruthy();
    expect("collectionObservable" in initDependencies).toBeTruthy();
    expect("connectionObservable" in initDependencies).toBeTruthy();
    expect("findOneObservable" in initDependencies).toBeTruthy();
    expect("insertOneObservable" in initDependencies).toBeTruthy();
    expect("mongoClientObservable" in initDependencies).toBeTruthy();
    expect("queryObservable" in initDependencies).toBeTruthy();
    expect("requestObservable" in initDependencies).toBeTruthy();
    expect("requestUploadObservable" in initDependencies).toBeTruthy();
    expect("requestsObservable" in initDependencies).toBeTruthy();
    expect("requestsUploadObservable" in initDependencies).toBeTruthy();
    expect("testAction$" in initDependencies).toBeTruthy();
    expect("youtubeDownloadObservable" in initDependencies).toBeTruthy();
    expect(Object.keys(initDependencies).length).toEqual(15);
    expect(initDependencies).toMatchObject({
      botToken: env.BOT_TOKEN,
      testAction$: undefined
    });
  });
});
