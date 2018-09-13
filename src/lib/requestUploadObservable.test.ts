import * as FormData from "form-data";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";
import { requestUploadObservable } from "./requestUploadObservable";

describe("requestObservable lib", (): void => {

  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler((actual: any, expected: any): boolean | void => {
      expect(actual)
        .toEqual(expected);
    });
  });

  test("should create an Observable", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<any> = cold("-a", {
        a: requestUploadObservable({}, new FormData()),
      });
      expectObservable(action$)
        .toBe("-a", { a: [] });
    });
  });

});
