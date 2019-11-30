import { ofType, StateObservable } from "redux-observable";
import { Observable, ObservableInput } from "rxjs";
import { startWith, switchMap, take } from "rxjs/operators";

import { IActionAnswerInlineQuery } from "../../types/iActionAnswerInlineQuery";
import { IActionCallbackQueryDataInsert } from "../../types/iActionCallbackQueryDataInsert";
import { IActionEditMessageMedia } from "../../types/iActionEditMessageMedia";
import { IActionSendPhoto } from "../../types/iActionSendPhoto";
import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { transformObservable as transformObservableToAnswerInlineQuery } from "./youtubeVideoListToAnswerInlineQuery";
import { transformObservable as transformObservableToEditMessageMedia } from "./youtubeVideoListToEditMessageMedia";
import { transformObservable as transformObservableToSendPhoto } from "./youtubeVideoListToSendPhoto";

const youtubeVideoListResult: (
  action$: Observable<IActionYoutubeVideoList>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<
  | IActionAnswerInlineQuery
  | IActionCallbackQueryDataInsert
  | IActionEditMessageMedia
  | IActionSendPhoto
  | IActionYoutubeVideoList
> = (
  action$: Observable<IActionYoutubeVideoList>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<
  | IActionAnswerInlineQuery
  | IActionCallbackQueryDataInsert
  | IActionEditMessageMedia
  | IActionSendPhoto
  | IActionYoutubeVideoList
> => {
  const { testAction$ } = dependencies;

  const transformObservable: (
    action: IActionYoutubeVideoList
  ) => (
    action2: IActionCallbackQueryDataInsert
  ) => Observable<
    | IActionAnswerInlineQuery
    | IActionCallbackQueryDataInsert
    | IActionEditMessageMedia
    | IActionSendPhoto
    | IActionYoutubeVideoList
  > = (action: IActionYoutubeVideoList) => (
    action2: IActionCallbackQueryDataInsert
  ): Observable<
    | IActionAnswerInlineQuery
    | IActionCallbackQueryDataInsert
    | IActionEditMessageMedia
    | IActionSendPhoto
    | IActionYoutubeVideoList
  > => {
    if (state$ !== undefined && state$.value.inlineQuery.query !== undefined) {
      return transformObservableToAnswerInlineQuery(state$)(action)(action2);
    } else {
      if (
        state$ !== undefined &&
        state$.value.message.query !== undefined &&
        state$.value.message.query.message !== undefined
      ) {
        return transformObservableToSendPhoto(state$)(action)(action2);
      }
      return transformObservableToEditMessageMedia(state$)(action)(action2);
    }
  };

  const startAction: (
    action: IActionYoutubeVideoList
  ) => IActionCallbackQueryDataInsert | IActionYoutubeVideoList = (
    action: IActionYoutubeVideoList
  ): IActionCallbackQueryDataInsert | IActionYoutubeVideoList => {
    if (state$ === undefined) {
      return actions.youtubeVideoList.error({
        error: new Error(texts.state$Undefined)
      });
    }
    if (action.youtubeVideoList.result === undefined) {
      return actions.youtubeVideoList.error({
        error: new Error(texts.actionYoutubeVideoListResultUndefined)
      });
    }
    if (action.youtubeVideoList.result.pageInfo === undefined) {
      return actions.youtubeVideoList.error({
        error: new Error(texts.actionYoutubeVideoListResultPageInfoUndefined)
      });
    }

    if (
      action.youtubeVideoList.result.pageInfo.resultsPerPage === null ||
      action.youtubeVideoList.result.pageInfo.resultsPerPage === undefined
    ) {
      return actions.youtubeVideoList.error({
        error: new Error(
          texts.actionYoutubeVideoListResultPageInfoResultsPerPageUndefined
        )
      });
    }
    if (
      action.youtubeVideoList.result.pageInfo.totalResults === null ||
      action.youtubeVideoList.result.pageInfo.totalResults === undefined
    ) {
      return actions.youtubeVideoList.error({
        error: new Error(
          texts.actionYoutubeVideoListResultPageInfoTotalResultsUndefined
        )
      });
    }

    return actions.callbackQueryDataInsert.query({
      query: {
        chart: "mostPopular",
        nextPageToken: action.youtubeVideoList.result.nextPageToken,
        pageInfo: action.youtubeVideoList.result.pageInfo,
        prevPageToken: action.youtubeVideoList.result.prevPageToken
      }
    });
  };

  return action$.pipe(
    ofType(actions.youtubeVideoList.YOUTUBE_VIDEO_LIST_RESULT),
    switchMap(
      (
        action: IActionYoutubeVideoList
      ): ObservableInput<
        | IActionAnswerInlineQuery
        | IActionCallbackQueryDataInsert
        | IActionEditMessageMedia
        | IActionSendPhoto
        | IActionYoutubeVideoList
      > =>
        (testAction$ !== undefined ? testAction$ : action$).pipe(
          ofType(
            actions.callbackQueryDataInsert.CALLBACK_QUERY_DATA_INSERT_RESULT
          ),
          take<IActionCallbackQueryDataInsert & IActionYoutubeVideoList>(1),
          switchMap(transformObservable(action)),
          startWith(startAction(action))
        )
    )
  );
};

export { youtubeVideoListResult };
