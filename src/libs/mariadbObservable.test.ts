import { Connection, createConnection } from "mariadb";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import {
  createConnectionObservable,
  queryObservable
} from "./mariadbObservable";

describe("mariadbObservable lib", (): void => {
  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler((actual: any, expected: any):
      | boolean
      | void => {
      expect(actual).toEqual(expected);
    });
  });

  test("should create an createConnectionObservable", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<any> = cold("-a", {
        a: createConnectionObservable("")
      });
      expectObservable(action$).toBe("-a", { a: [] });
    });
  });

  test("should create an queryObservable", (): void => {
    createConnection("").then((conection: Connection) => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<any> = cold("-a", {
          a: queryObservable(conection, "")
        });
        expectObservable(action$).toBe("-a", { a: [] });
      });
    });
  });
});
