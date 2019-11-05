import { ofType, StateObservable } from "redux-observable";
import { Observable, ObservableInput, of, race } from "rxjs";
import {
  catchError,
  filter,
  map,
  startWith,
  switchMap,
  switchMapTo,
  take
} from "rxjs/operators";

import { IActionGetChatMember } from "../../types/iActionGetChatMember";
import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IVideoInfo } from "../../types/libs/iVideoInfo";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { actionGetChatMemberResultStatus } from "../utils/boolean";

import { cache } from "./youtubeDownloadCache";
// import { transformObservable as transformObservableToSendMessage } from "./youtubeDownloadToSendMessage";
import { transformObservable as transformObservableToSendVideo } from "./youtubeDownloadToSendVideo";

const youtubeDownload: (
  action$: Observable<IActionYoutubeDownload>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<
  IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
> = (
  action$: Observable<IActionYoutubeDownload>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<
  IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
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

    return youtubeDownloadObservable(action.youtubeDownload
      .query as string).pipe(
      map(
        (result: IVideoInfo): IActionYoutubeDownload =>
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
        IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
      > =>
        (testAction$ !== undefined ? testAction$ : action$).pipe(
          ofType(actions.getChatMember.GET_CHAT_MEMBER_RESULT),
          take<IActionGetChatMember & IActionYoutubeDownload>(1),
          filter(actionGetChatMemberResultStatus),
          switchMapTo(
            race(actionObservable(action), cache(action, dependencies))
          ),
          switchMap(transformObservableToSendVideo(state$)),
          startWith(startAction())
        )
    )
  );
};

export { youtubeDownload };
