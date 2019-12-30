---
to: src/epics/<%= h.changeCase.camel(name)%>.test.ts
unless_exists: true
---
import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IAction<%= h.changeCase.pascal(name)%> } from "../../types/iAction<%= h.changeCase.pascal(name)%>";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IState<%= h.changeCase.pascal(name)%>Query } from "../../types/iState<%= h.changeCase.pascal(name)%>Query";
import * as actions from "../actions";
import * as epic from "../epics/<%= h.changeCase.camel(name)%>";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("<%= h.changeCase.camel(name)%> epic", (): void => {
  const error: Error = new Error("");
  const query: IState<%= h.changeCase.pascal(name)%>Query = {
    // TODO: fill it
  };
  // TODO: check it
  const result = true;
  const responseOKF: IResponse = {
    ok: false
  };
  const responseOKT: IResponse = {
    ok: true,
    result
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

  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler((actual: IState, expected: IState):
      | boolean
      | void => {
      expect(actual).toEqual(expected);
    });
  });

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IAction<%= h.changeCase.pascal(name)%>> = cold("-a", {
          a: actions.<%= h.changeCase.camel(name)%>.query({ query })
        });
        const state$: StateObservable<IState> | undefined = undefined;
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          authorization: (): Observable<boolean> => of(true),
          botToken: "",
          requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
        };
        const output$: Observable<IAction<%= h.changeCase.pascal(name)%>> = epic.<%= h.changeCase.camel(name)%>(action$, state$, dependencies);
        expectObservable(output$).toBe("---a", {
          a: actions.<%= h.changeCase.camel(name)%>.error({ error })
        });
      });
    });
  

  test("should handle error action<%= h.changeCase.pascal(name)%>Query undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
        const action$: Observable<IAction<%= h.changeCase.pascal(name)%>> = cold("-a", {
          a: actions.<%= h.changeCase.camel(name)%>.query({ query:  undefined })
        });
        const state$: StateObservable<IState> | undefined = undefined;
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          authorization: (): Observable<boolean> => of(true),
          botToken: "",
          requestsObservable: (): ColdObservable<any> => cold("--a")
        };
        const output$: Observable<IAction<%= h.changeCase.pascal(name)%>> = epic.<%= h.changeCase.camel(name)%>(action$, state$, dependencies);
        expectObservable(output$).toBe("-a", {
          a: actions.<%= h.changeCase.camel(name)%>.error({ error: new Error(locales.find("action<%= h.changeCase.pascal(name)%>QueryUndefined")) })
        });
      });
    });
  

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IAction<%= h.changeCase.pascal(name)%>> = cold("-a", {
          a: actions.<%= h.changeCase.camel(name)%>.query({ query })
        });
        const state$: StateObservable<IState> | undefined = undefined;
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          authorization: (): Observable<boolean> => of(true),
          botToken: "",
          requestsObservable: (): ColdObservable<any> => cold("--a", { a: responseOKF })
        };
        const output$: Observable<IAction<%= h.changeCase.pascal(name)%>> = epic.<%= h.changeCase.camel(name)%>(action$, state$, dependencies);
        expectObservable(output$).toBe("---a", {
          a: actions.<%= h.changeCase.camel(name)%>.error({ error: responseOKF })
        });
      });
    });
  

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IAction<%= h.changeCase.pascal(name)%>> = cold("-a", {
          a: actions.<%= h.changeCase.camel(name)%>.query({ query })
        });
        const state$: StateObservable<IState> | undefined = undefined;
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          authorization: (): Observable<boolean> => of(true),
          botToken: "",
          requestsObservable: (): ColdObservable<any> => cold("--a", { a: responseOKT })
        };
        const output$: Observable<IAction<%= h.changeCase.pascal(name)%>> = epic.<%= h.changeCase.camel(name)%>(action$, state$, dependencies);
        expectObservable(output$).toBe("---a", {
          a: actions.<%= h.changeCase.camel(name)%>.result({ result })
        });
      });
    });
  
});
