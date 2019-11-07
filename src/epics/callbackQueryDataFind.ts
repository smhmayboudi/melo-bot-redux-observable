import { MongoClient, ObjectId } from "mongodb";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

import { IActionCallbackQueryDataFind } from "../../types/iActionCallbackQueryDataFind";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateCallbackQueryDataInsertQuery } from "../../types/iStateCallbackQueryDataInsertQuery";
import * as actions from "../actions";
import * as env from "../configs/env";
import * as texts from "../configs/texts";

const callbackQueryDataFind: (
  action$: Observable<IActionCallbackQueryDataFind>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<
  | IActionCallbackQueryDataFind
  | IActionYoutubeSearchList
  | IActionYoutubeVideoList
> = (
  action$: Observable<IActionCallbackQueryDataFind>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<
  | IActionCallbackQueryDataFind
  | IActionYoutubeSearchList
  | IActionYoutubeVideoList
> => {
  const {
    collectionObservable,
    findOneObservable,
    mongoClientObservable
  } = dependencies;

  const actionObservable: (
    action: IActionCallbackQueryDataFind
  ) => Observable<IActionCallbackQueryDataFind> = (
    action: IActionCallbackQueryDataFind
  ): Observable<IActionCallbackQueryDataFind> => {
    if (mongoClientObservable === undefined) {
      return of(
        actions.callbackQueryDataFind.error({
          error: new Error(
            texts.epicDependencyMongoClientObservableObservableUndefined
          )
        })
      );
    }

    return mongoClientObservable().pipe(
      switchMap(
        (client: MongoClient): Observable<IActionCallbackQueryDataFind> => {
          if (collectionObservable === undefined) {
            return of(
              actions.callbackQueryDataFind.error({
                error: new Error(
                  texts.epicDependencyCollectionObservableUndefined
                )
              })
            );
          }

          return collectionObservable(
            client.db("melodio"),
            "callbackQueryData",
            {}
          ).pipe(
            switchMap(
              (collection: any): Observable<IActionCallbackQueryDataFind> => {
                if (findOneObservable === undefined) {
                  return of(
                    actions.callbackQueryDataFind.error({
                      error: new Error(
                        texts.epicDependencyFindOneObservableUndefined
                      )
                    })
                  );
                }
                if (action.callbackQueryDataFind.query === undefined) {
                  return of(
                    actions.callbackQueryDataFind.error({
                      error: new Error(
                        texts.actionCallbackQueryDataFindQueryUndefined
                      )
                    })
                  );
                }

                return findOneObservable(collection, {
                  _id: new ObjectId(action.callbackQueryDataFind.query.id)
                }).pipe(
                  switchMap((value: IStateCallbackQueryDataInsertQuery) =>
                    of(
                      actions.callbackQueryDataFind.result({
                        result: value
                      })
                    )
                  ),
                  catchError((error: any) =>
                    of(
                      actions.callbackQueryDataFind.error({
                        error
                      })
                    )
                  )
                );
              }
            ),
            catchError((error: any) =>
              of(
                actions.callbackQueryDataFind.error({
                  error
                })
              )
            )
          );
        }
      ),
      catchError((error: any) =>
        of(
          actions.callbackQueryDataFind.error({
            error
          })
        )
      )
    );
  };

  const transformObservable = (
    action: IActionCallbackQueryDataFind
  ): Observable<
    | IActionCallbackQueryDataFind
    | IActionYoutubeSearchList
    | IActionYoutubeVideoList
  > => {
    if (
      action.type ===
      actions.callbackQueryDataFind.CALLBACK_QUERY_DATA_FIND_ERROR
    ) {
      return of(action);
    }
    if (state$ === undefined) {
      return of(
        actions.callbackQueryDataFind.error({
          error: new Error(texts.state$Undefined)
        })
      );
    }
    if (state$.value.callbackQueryDataFind.query === undefined) {
      return of(
        actions.youtubeVideoList.error({
          error: new Error(texts.state$ValueCallbackQueryDataFindQueryUndefined)
        })
      );
    }
    if (action.callbackQueryDataFind.result === undefined) {
      return of(
        actions.youtubeVideoList.error({
          error: new Error(texts.actionCallbackQueryDataFindResultUndefined)
        })
      );
    }
    if (action.callbackQueryDataFind.result.pageInfo === undefined) {
      return of(
        actions.youtubeVideoList.error({
          error: new Error(
            texts.actionCallbackQueryDataFindResultPageInfoUndefined
          )
        })
      );
    }
    if (
      action.callbackQueryDataFind.result.pageInfo.resultsPerPage === null ||
      action.callbackQueryDataFind.result.pageInfo.resultsPerPage === undefined
    ) {
      return of(
        actions.youtubeVideoList.error({
          error: new Error(
            texts.actionCallbackQueryDataFindResultPageInfoResultsPerPageUndefined
          )
        })
      );
    }
    if (action.callbackQueryDataFind.result.q !== undefined) {
      return of(
        actions.youtubeSearchList.query({
          query: {
            key: env.GOOGLE_API_KEY,
            maxResults:
              action.callbackQueryDataFind.result.pageInfo.resultsPerPage,
            part: "id,snippet",
            pageToken: state$.value.callbackQueryDataFind.query.pageToken,
            q: action.callbackQueryDataFind.result.q,
            regionCode: env.GOOGLE_API_REGION_CODE,
            relevanceLanguage: env.GOOGLE_API_RELEVANCE_LANGUAGE,
            safeSearch: env.GOOGLE_API_SAFE_SEARCH,
            type: env.GOOGLE_API_SEARCH_LIST_TYPE
          }
        })
      );
    } else if (action.callbackQueryDataFind.result.chart !== undefined) {
      return of(
        actions.youtubeVideoList.query({
          query: {
            chart: action.callbackQueryDataFind.result.chart,
            hl: env.GOOGLE_API_RELEVANCE_LANGUAGE,
            key: env.GOOGLE_API_KEY,
            maxResults:
              action.callbackQueryDataFind.result.pageInfo.resultsPerPage,
            part: "id,snippet",
            pageToken: state$.value.callbackQueryDataFind.query.pageToken,
            regionCode: env.GOOGLE_API_REGION_CODE
          }
        })
      );
    }

    return of(action);
  };

  return action$.pipe(
    ofType(actions.callbackQueryDataFind.CALLBACK_QUERY_DATA_FIND_QUERY),
    switchMap(actionObservable),
    switchMap(transformObservable)
  );
};

export { callbackQueryDataFind };
