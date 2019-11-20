declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      __MONGO_DB_NAME__: string;
      __MONGO_URI__: string;
    }
  }
}

import { MongoClient } from "mongodb";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import {
  collectionObservable,
  connectObservable,
  findOneObservable,
  insertOneObservable
} from "./mongodbObservable";

describe("mongodbObservable lib", (): void => {
  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler((actual: any, expected: any):
      | boolean
      | void => {
      expect(actual).toEqual(expected);
    });
  });

  test("should create an connectObservable", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<any> = cold("-a", {
        a: connectObservable(global.__MONGO_URI__, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
      });
      expectObservable(action$).toBe("-a", { a: [] });
    });
  });

  test("should create an collectionObservable", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<any> = cold("-a", {
        a: collectionObservable(new MongoClient("").db(""), "", {})
      });
      expectObservable(action$).toBe("-a", { a: [] });
    });
  });

  test("should create an findOneObservable", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<any> = cold("-a", {
        a: findOneObservable(new MongoClient("").db("").collection(""), {})
      });
      expectObservable(action$).toBe("-a", { a: [] });
    });
  });

  test("should create an insertOneObservable", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<any> = cold("-a", {
        a: insertOneObservable(
          new MongoClient("").db("").collection(""),
          "",
          {}
        )
      });
      expectObservable(action$).toBe("-a", { a: [] });
    });
  });
});
