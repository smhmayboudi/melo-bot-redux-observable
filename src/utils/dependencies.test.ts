import { ILocale } from "../../types/iLocale";
import * as env from "../configs/env";
import { init } from "./dependencies";
import { locale } from "./string";

describe("dependencies utils", (): void => {
  test("should handle initDependencies", (): void => {
    const locales: ILocale = locale("en");
    const initDependencies = init(locales).initDependencies;
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
    expect(Object.keys(initDependencies).length).toEqual(14);
    expect(initDependencies).toMatchObject({
      botToken: env.BOT_TOKEN,
      testAction$: undefined
    });
  });
});
