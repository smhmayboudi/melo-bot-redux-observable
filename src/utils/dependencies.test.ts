import { initialDependencies } from "./dependencies";
import * as env from "../configs/env";

describe("dependencies utils", (): void => {
  test("should handle initialDependencies", (): void => {
    expect("botToken" in initialDependencies).toBeTruthy();
    expect("collectionObservable" in initialDependencies).toBeTruthy();
    expect("connectionObservable" in initialDependencies).toBeTruthy();
    expect("findOneObservable" in initialDependencies).toBeTruthy();
    expect("insertOneObservable" in initialDependencies).toBeTruthy();
    expect("mongoClientObservable" in initialDependencies).toBeTruthy();
    expect("queryObservable" in initialDependencies).toBeTruthy();
    expect("requestObservable" in initialDependencies).toBeTruthy();
    expect("requestUploadObservable" in initialDependencies).toBeTruthy();
    expect("requestsObservable" in initialDependencies).toBeTruthy();
    expect("requestsUploadObservable" in initialDependencies).toBeTruthy();
    expect("testAction$" in initialDependencies).toBeTruthy();
    expect("youtubeDownloadObservable" in initialDependencies).toBeTruthy();
    expect(Object.keys(initialDependencies).length).toEqual(13);
    expect(initialDependencies).toMatchObject({
      botToken: env.BOT_TOKEN,
      testAction$: undefined
    });
  });
});
