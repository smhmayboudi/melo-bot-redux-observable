import { ofType, StateObservable } from "redux-observable";
import { Observable, ObservableInput, of, race } from "rxjs";
import {
  catchError,
  map,
  startWith,
  switchMap,
  switchMapTo
} from "rxjs/operators";

import { IActionGetChatMember } from "../../types/iActionGetChatMember";
import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { actionGetChatMemberResultStatus } from "../utils/boolean";

import { cache } from "./youtubeDownloadCache";
import { transformObservable as transformObservableToSendMessage } from "./youtubeDownloadToSendMessage";
import { transformObservable as transformObservableToSendVideo } from "./youtubeDownloadToSendVideo";
import { IActionSendMessage } from "../../types/iActionSendMessage";

const youtubeDownload: (
  action$: Observable<IActionYoutubeDownload>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<
  | IActionGetChatMember
  | IActionSendMessage
  | IActionSendVideo
  | IActionYoutubeDownload
> = (
  action$: Observable<IActionYoutubeDownload>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<
  | IActionGetChatMember
  | IActionSendMessage
  | IActionSendVideo
  | IActionYoutubeDownload
> => {
  const { testAction$, youtubeDownloadObservable } = dependencies;

  const actionObservable: (
    action: IActionYoutubeDownload
  ) => Observable<IActionYoutubeDownload> = (
    action: IActionYoutubeDownload
  ): Observable<IActionYoutubeDownload> => {
    if (youtubeDownloadObservable === undefined) {
      return of(
        actions.youtubeDownload.error({
          error: new Error(
            texts.epicDependencyYoutubeDownloadObservableUndefined
          )
        })
      );
    }
    if (action.youtubeDownload.query === undefined) {
      return of(
        actions.youtubeDownload.error({
          error: new Error(texts.actionYoutubeDownloadQueryUndefined)
        })
      );
    }

    return youtubeDownloadObservable(action.youtubeDownload.query.id).pipe(
      map(
        (
          result: IStateYoutubeDownloadResultInsertQuery
        ): IActionYoutubeDownload =>
          actions.youtubeDownload.result({
            result
          })
      ),
      catchError((error: any) =>
        of(
          actions.youtubeDownload.error({
            error
          })
        )
      )
    );
  };

  const transformObservable: (
    action: IActionYoutubeDownload
  ) => (
    action2: any
  ) => Observable<
    | IActionGetChatMember
    | IActionSendMessage
    | IActionSendVideo
    | IActionYoutubeDownload
  > = (action: IActionYoutubeDownload) => (
    action2: any
  ): Observable<
    | IActionGetChatMember
    | IActionSendMessage
    | IActionSendVideo
    | IActionYoutubeDownload
  > => {
    if (actionGetChatMemberResultStatus(action2)) {
      return of(action).pipe(
        switchMapTo(
          race(actionObservable(action), cache(action, dependencies))
        ),
        switchMap(transformObservableToSendVideo(state$))
      );
    }
    return transformObservableToSendMessage(action, state$);
  };

  const startAction: () => IActionGetChatMember | IActionYoutubeDownload = ():
    | IActionGetChatMember
    | IActionYoutubeDownload => {
    if (state$ === undefined) {
      return actions.youtubeDownload.error({
        error: new Error(texts.state$Undefined)
      });
    }
    if (state$.value.message.query === undefined) {
      return actions.youtubeDownload.error({
        error: new Error(texts.state$ValueMessageQueryUndefined)
      });
    }
    if (state$.value.message.query.message === undefined) {
      return actions.youtubeDownload.error({
        error: new Error(texts.state$ValueMessageQueryMessageUndefined)
      });
    }

    return actions.getChatMember.query({
      query: {
        chat_id: "@melodio",
        user_id: state$.value.message.query.message.chat.id
      }
    });
  };

  return action$.pipe(
    ofType(actions.youtubeDownload.YOUTUBE_DOWNLOAD_QUERY),
    switchMap(
      (
        action: IActionYoutubeDownload
      ): ObservableInput<
        | IActionGetChatMember
        | IActionSendMessage
        | IActionSendVideo
        | IActionYoutubeDownload
      > =>
        (testAction$ !== undefined ? testAction$ : action$).pipe(
          ofType(actions.getChatMember.GET_CHAT_MEMBER_RESULT),
          switchMap(transformObservable(action)),
          startWith(startAction())
        )
    )
  );
};

export { youtubeDownload };
