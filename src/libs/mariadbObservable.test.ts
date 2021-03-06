import { Connection, createConnection } from "mariadb";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import * as env from "../configs/env";

import {
  createConnectionObservable,
  queryObservable
} from "./mariadbObservable";

describe("mariadbObservable lib", (): void => {
  let connection: Connection;

  beforeAll(
    async (): Promise<void> => {
      connection = await createConnection(env.MARIA_CLIENT_URI);
    }
  );

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
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<any> = cold("-a", {
        a: queryObservable(connection, "")
      });
      expectObservable(action$).toBe("-a", { a: [] });
    });
  });
});
