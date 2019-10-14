import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionSendAudio } from "../../types/iActionSendAudio";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateSendAudioQuery } from "../../types/iStateSendAudioQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as action from "../actions/sendAudio";
import * as texts from "../config/texts";

import * as epic from "./sendAudio";

describe("sendAudio epic", (): void => {
  const error: Error = new Error("");
  const query: IStateSendAudioQuery = {
    audio: "",
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    parse_mode: "HTML",
    performer: "",
    reply_markup: { remove_keyboard: true },
    reply_to_message_id: 0,
    thumb: "",
    title: ""
  };
  const queryNoCaption: IStateSendAudioQuery = {
    audio: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    parse_mode: "HTML",
    performer: "",
    reply_markup: { remove_keyboard: true },
    reply_to_message_id: 0,
    thumb: "",
    title: ""
  };
  const queryNoDisableNotification: IStateSendAudioQuery = {
    audio: "",
    caption: "",
    chat_id: 0,
    duration: 0,
    parse_mode: "HTML",
    performer: "",
    reply_markup: { remove_keyboard: true },
    reply_to_message_id: 0,
    thumb: "",
    title: ""
  };
  const queryNoDuration: IStateSendAudioQuery = {
    audio: "",
    caption: "",
    chat_id: 0,
    disable_notification: true,
    parse_mode: "HTML",
    performer: "",
    reply_markup: { remove_keyboard: true },
    reply_to_message_id: 0,
    thumb: "",
    title: ""
  };
  const queryNoParseMode: IStateSendAudioQuery = {
    audio: "",
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    performer: "",
    reply_markup: { remove_keyboard: true },
    reply_to_message_id: 0,
    thumb: "",
    title: ""
  };
  const queryNoPerformer: IStateSendAudioQuery = {
    audio: "",
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    parse_mode: "HTML",
    reply_markup: { remove_keyboard: true },
    reply_to_message_id: 0,
    thumb: "",
    title: ""
  };
  const queryNoReplyMarkup: IStateSendAudioQuery = {
    audio: "",
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    parse_mode: "HTML",
    performer: "",
    reply_to_message_id: 0,
    thumb: "",
    title: ""
  };
  const queryNoReplyToMessageId: IStateSendAudioQuery = {
    audio: "",
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    parse_mode: "HTML",
    performer: "",
    reply_markup: { remove_keyboard: true },
    thumb: "",
    title: ""
  };
  const queryNoThumb: IStateSendAudioQuery = {
    audio: "",
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    parse_mode: "HTML",
    performer: "",
    reply_markup: { remove_keyboard: true },
    reply_to_message_id: 0,
    title: ""
  };
  const queryNoTitle: IStateSendAudioQuery = {
    audio: "",
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    parse_mode: "HTML",
    performer: "",
    reply_markup: { remove_keyboard: true },
    reply_to_message_id: 0,
    thumb: ""
  };
  const result: IMessage = {
    chat: {
      id: 0,
      type: "private"
    },
    date: 0,
    message_id: 0
  };
  const resultOKF: IResponse = {
    description: "Bad Request: CHAT_ADMIN_REQUIRED",
    error_code: 400,
    ok: false
  };
  const resultOKT: IResponse = {
    ok: true,
    result
  };

  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler((actual: IState, expected: IState):
      | boolean
      | void => {
      expect(actual).toEqual(expected);
    });
  });

  test("should handle dependency botToken undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendAudio> = cold("-a", {
        a: action.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", {
            a: resultOKT
          })
      };
      const output$: Observable<IActionSendAudio> = epic.sendAudio(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: action.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsUploadObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendAudio> = cold("-a", {
        a: action.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsUploadObservable: undefined
      };
      const output$: Observable<IActionSendAudio> = epic.sendAudio(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: action.error({
          error: new Error(
            texts.epicDependencyRequestsUploadObservableUndefined
          )
        })
      });
    });
  });

  test("should handle dependency requestsUploadObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendAudio> = cold("-a", {
        a: action.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--#", {}, error)
      };
      const output$: Observable<IActionSendAudio> = epic.sendAudio(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: action.error({
          error
        })
      });
    });
  });

  test("should handle error actionSendAudioQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendAudio> = cold("-a", {
        a: action.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", {
            a: resultOKT
          })
      };
      const output$: Observable<IActionSendAudio> = epic.sendAudio(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: action.error({
          error: new Error(texts.actionSendAudioQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendAudio> = cold("-a", {
        a: action.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", {
            a: resultOKF
          })
      };
      const output$: Observable<IActionSendAudio> = epic.sendAudio(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: action.error({
          error: resultOKF
        })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendAudio> = cold("-a", {
        a: action.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", {
            a: resultOKT
          })
      };
      const output$: Observable<IActionSendAudio> = epic.sendAudio(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: action.result({
          result
        })
      });
    });
  });

  test("should handle result ok true no caption", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendAudio> = cold("-a", {
        a: action.query({
          query: queryNoCaption
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", {
            a: resultOKT
          })
      };
      const output$: Observable<IActionSendAudio> = epic.sendAudio(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: action.result({
          result
        })
      });
    });
  });

  test("should handle result ok true no disable_notification", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendAudio> = cold("-a", {
        a: action.query({
          query: queryNoDisableNotification
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", {
            a: resultOKT
          })
      };
      const output$: Observable<IActionSendAudio> = epic.sendAudio(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: action.result({
          result
        })
      });
    });
  });

  test("should handle result ok true no duration", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendAudio> = cold("-a", {
        a: action.query({
          query: queryNoDuration
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", {
            a: resultOKT
          })
      };
      const output$: Observable<IActionSendAudio> = epic.sendAudio(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: action.result({
          result
        })
      });
    });
  });

  test("should handle result ok true no parse_mode", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendAudio> = cold("-a", {
        a: action.query({
          query: queryNoParseMode
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", {
            a: resultOKT
          })
      };
      const output$: Observable<IActionSendAudio> = epic.sendAudio(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: action.result({
          result
        })
      });
    });
  });

  test("should handle result ok true no performer", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendAudio> = cold("-a", {
        a: action.query({
          query: queryNoPerformer
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", {
            a: resultOKT
          })
      };
      const output$: Observable<IActionSendAudio> = epic.sendAudio(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: action.result({
          result
        })
      });
    });
  });

  test("should handle result ok true no reply_markup", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendAudio> = cold("-a", {
        a: action.query({
          query: queryNoReplyMarkup
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", {
            a: resultOKT
          })
      };
      const output$: Observable<IActionSendAudio> = epic.sendAudio(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: action.result({
          result
        })
      });
    });
  });

  test("should handle result ok true no reply_to_message_id", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendAudio> = cold("-a", {
        a: action.query({
          query: queryNoReplyToMessageId
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", {
            a: resultOKT
          })
      };
      const output$: Observable<IActionSendAudio> = epic.sendAudio(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: action.result({
          result
        })
      });
    });
  });

  test("should handle result ok true no thumb", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendAudio> = cold("-a", {
        a: action.query({
          query: queryNoThumb
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", {
            a: resultOKT
          })
      };
      const output$: Observable<IActionSendAudio> = epic.sendAudio(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: action.result({
          result
        })
      });
    });
  });

  test("should handle result ok true no title", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendAudio> = cold("-a", {
        a: action.query({
          query: queryNoTitle
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", {
            a: resultOKT
          })
      };
      const output$: Observable<IActionSendAudio> = epic.sendAudio(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: action.result({
          result
        })
      });
    });
  });
});
