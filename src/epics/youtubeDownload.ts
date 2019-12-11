import { ofType, StateObservable } from "redux-observable";
import { Observable, ObservableInput, of } from "rxjs";
import { catchError, map, startWith, switchMap, take } from "rxjs/operators";
import { IActionGetChatMember } from "../../types/iActionGetChatMember";
import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IActionYoutubeDownloadResultFind } from "../../types/iActionYoutubeDownloadResultFind";
import { IActionYoutubeDownloadResultInsert } from "../../types/iActionYoutubeDownloadResultInsert";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";
import * as actions from "../actions";
import { actionGetChatMemberResultStatus } from "../utils/boolean";
import { startAction as startActionGetChatMember } from "./youtubeDownloadToGetChatMember";
import { transformObservable as transformObservableSendMessage } from "./youtubeDownloadToSendMessage";
import {
  startAction as startActionYoutubeDownloadResultFind,
  transformObservable as transformObservableYoutubeDownloadResultFind
} from "./youtubeDownloadToYoutubeDownloadResultFind";
import {
  startAction as startActionSendVideo,
  transformObservable as transformObservableSendVideo
} from "./youtubeDownloadToYoutubeDownloadResultInsert";

const youtubeDownload: (
  action$: Observable<IActionYoutubeDownload>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<
  | IActionGetChatMember
  | IActionSendMessage
  | IActionSendVideo
  | IActionYoutubeDownload
  | IActionYoutubeDownloadResultFind
  | IActionYoutubeDownloadResultInsert
> = (
  action$: Observable<IActionYoutubeDownload>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<
  | IActionGetChatMember
  | IActionSendMessage
  | IActionSendVideo
  | IActionYoutubeDownload
  | IActionYoutubeDownloadResultFind
  | IActionYoutubeDownloadResultInsert
> => {
  const { testAction$, locales, youtubeDownloadObservable } = dependencies;

  const actionObservable: (
    action: IActionYoutubeDownload
  ) => Observable<IActionYoutubeDownload> = (
    action: IActionYoutubeDownload
  ): Observable<IActionYoutubeDownload> => {
    if (action.youtubeDownload.query === undefined) {
      return of(
        actions.youtubeDownload.error({
          error: new Error(locales.find("actionYoutubeDownloadQueryUndefined"))
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

  const sendVideo: (
    action: IActionYoutubeDownload
  ) => Observable<
    | IActionSendVideo
    | IActionYoutubeDownload
    | IActionYoutubeDownloadResultInsert
  > = (
    action: IActionYoutubeDownload
  ): Observable<
    | IActionSendVideo
    | IActionYoutubeDownload
    | IActionYoutubeDownloadResultInsert
  > =>
    (testAction$ !== undefined ? testAction$ : action$).pipe(
      ofType(actions.sendVideo.SEND_VIDEO_RESULT),
      take<IActionSendVideo & IActionYoutubeDownload>(1),
      switchMap(transformObservableSendVideo(action, dependencies)),
      startWith(startActionSendVideo(action, state$, dependencies))
    );

  const youtubeDownloadResultFind: (
    action: IActionYoutubeDownload
  ) => Observable<
    | IActionSendVideo
    | IActionYoutubeDownload
    | IActionYoutubeDownloadResultFind
    | IActionYoutubeDownloadResultInsert
  > = (
    action: IActionYoutubeDownload
  ): Observable<
    | IActionSendVideo
    | IActionYoutubeDownload
    | IActionYoutubeDownloadResultFind
    | IActionYoutubeDownloadResultInsert
  > =>
    (testAction$ !== undefined ? testAction$ : action$).pipe(
      ofType(
        actions.youtubeDownloadResultFind.YOUTUBE_DOWNLOAD_RESULT_FIND_RESULT
      ),
      take<IActionYoutubeDownload & IActionYoutubeDownloadResultFind>(1),
      switchMap((action2: IActionYoutubeDownloadResultFind) => {
        if (
          action2.youtubeDownloadResultFind.result !== null ||
          action2.youtubeDownloadResultFind.result !== undefined
        ) {
          return transformObservableYoutubeDownloadResultFind(
            state$,
            dependencies
          )(action2);
        }
        return actionObservable(action).pipe(switchMap(sendVideo));
      }),
      startWith(startActionYoutubeDownloadResultFind(action, dependencies))
    );

  const getChatMember: (
    action: IActionYoutubeDownload
  ) => (
    action2: IActionGetChatMember
  ) => Observable<
    | IActionGetChatMember
    | IActionSendMessage
    | IActionSendVideo
    | IActionYoutubeDownload
    | IActionYoutubeDownloadResultFind
    | IActionYoutubeDownloadResultInsert
  > = (action: IActionYoutubeDownload) => (
    action2: IActionGetChatMember
  ): Observable<
    | IActionGetChatMember
    | IActionSendMessage
    | IActionSendVideo
    | IActionYoutubeDownload
    | IActionYoutubeDownloadResultFind
    | IActionYoutubeDownloadResultInsert
  > => {
    if (actionGetChatMemberResultStatus(action2)) {
      return youtubeDownloadResultFind(action);
    }
    return transformObservableSendMessage(action, state$, dependencies);
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
        | IActionYoutubeDownloadResultFind
        | IActionYoutubeDownloadResultInsert
      > =>
        (testAction$ !== undefined ? testAction$ : action$).pipe(
          ofType(actions.getChatMember.GET_CHAT_MEMBER_RESULT),
          take<IActionGetChatMember & IActionYoutubeDownload>(1),
          switchMap(getChatMember(action)),
          startWith(startActionGetChatMember(state$, dependencies))
        )
    )
  );
};

export { youtubeDownload };
