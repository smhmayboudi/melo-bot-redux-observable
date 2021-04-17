import nock from "nock";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";
import { youtubeDownloadObservable } from "./youtubeDownloadObservable";

describe("requestObservable lib", (): void => {
  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler((actual: any, expected: any):
      | boolean
      | void => {
      expect(actual).toEqual(expected);
    });
  });

  nock("https://www.youtube.com")
    .get("/")
    .reply(200);

  test("should create an Observable", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<any> = cold("-a", {
        a: youtubeDownloadObservable("")
      });
      expectObservable(action$).toBe("-a", { a: [] });
    });
  });
});
