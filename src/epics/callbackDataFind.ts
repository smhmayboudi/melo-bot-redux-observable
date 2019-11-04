import { MongoClient, ObjectId } from "mongodb";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

import { IActionCallbackDataFind } from "../../types/iActionCallbackDataFind";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateCallbackDataInsertQuery } from "../../types/iStateCallbackDataInsertQuery";
import * as actions from "../actions";
import * as env from "../configs/env";
import * as texts from "../configs/texts";

const callbackDataFind: (
  action$: Observable<IActionCallbackDataFind>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<
  IActionCallbackDataFind | IActionYoutubeSearchList | IActionYoutubeVideoList
> = (
  action$: Observable<IActionCallbackDataFind>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<
  IActionCallbackDataFind | IActionYoutubeSearchList | IActionYoutubeVideoList
> => {
  const {
    collectionObservable,
    findOneObservable,
    mongoClientObservable
  } = dependencies;

  const actionObservable: (
    action: IActionCallbackDataFind
  ) => Observable<IActionCallbackDataFind> = (
    action: IActionCallbackDataFind
  ): Observable<IActionCallbackDataFind> => {
    if (mongoClientObservable === undefined) {
      return of(
        actions.callbackDataFind.error({
          error: new Error(
            texts.epicDependencyMongoClientObservableObservableUndefined
          )
        })
      );
    }

    return mongoClientObservable().pipe(
      switchMap(
        (client: MongoClient): Observable<IActionCallbackDataFind> => {
          if (collectionObservable === undefined) {
            return of(
              actions.callbackDataFind.error({
                error: new Error(
                  texts.epicDependencyCollectionObservableUndefined
                )
              })
            );
          }

          return collectionObservable(
            client.db("melodio"),
            "callbackData",
            {}
          ).pipe(
            switchMap(
              (collection: any): Observable<IActionCallbackDataFind> => {
                if (findOneObservable === undefined) {
                  return of(
                    actions.callbackDataFind.error({
                      error: new Error(
                        texts.epicDependencyFindOneObservableUndefined
                      )
                    })
                  );
                }
                if (action.callbackDataFind.query === undefined) {
                  return of(
                    actions.callbackDataFind.error({
                      error: new Error(
                        texts.actionCallbackDataFindQueryUndefined
                      )
                    })
                  );
                }

                return findOneObservable(collection, {
                  _id: new ObjectId(action.callbackDataFind.query.id)
                }).pipe(
                  switchMap((value: IStateCallbackDataInsertQuery) => {
                    console.log("value", value);
                    return of(
                      actions.callbackDataFind.result({
                        result: value
                      })
                    );
                  }),
                  catchError((error: any) =>
                    of(
                      actions.callbackDataFind.error({
                        error
                      })
                    )
                  )
                );
              }
            ),
            catchError((error: any) =>
              of(
                actions.callbackDataFind.error({
                  error
                })
              )
            )
          );
        }
      ),
      catchError((error: any) =>
        of(
          actions.callbackDataFind.error({
            error
          })
        )
      )
    );
  };

  const xxx = (
    action: IActionCallbackDataFind
  ): Observable<
    IActionCallbackDataFind | IActionYoutubeSearchList | IActionYoutubeVideoList
  > => {
    if (
      state$ !== undefined &&
      state$.value.callbackDataFind.query !== undefined &&
      action.callbackDataFind.result !== undefined &&
      action.callbackDataFind.result.pageInfo !== undefined &&
      action.callbackDataFind.result.pageInfo.resultsPerPage !== null
    ) {
      if (action.callbackDataFind.result.q !== undefined) {
        return of(
          actions.youtubeSearchList.query({
            query: {
              key: env.GOOGLE_API_KEY,
              maxResults:
                action.callbackDataFind.result.pageInfo.resultsPerPage,
              part: "id,snippet",
              pageToken: state$.value.callbackDataFind.query.pageToken,
              q: action.callbackDataFind.result.q,
              regionCode: env.GOOGLE_API_REGION_CODE,
              relevanceLanguage: env.GOOGLE_API_RELEVANCE_LANGUAGE,
              safeSearch: env.GOOGLE_API_SAFE_SEARCH,
              type: env.GOOGLE_API_SEARCH_LIST_TYPE
            }
          })
        );
      } else if (action.callbackDataFind.result.chart !== undefined) {
        return of(
          actions.youtubeVideoList.query({
            query: {
              chart: action.callbackDataFind.result.chart,
              hl: env.GOOGLE_API_RELEVANCE_LANGUAGE,
              key: env.GOOGLE_API_KEY,
              maxResults:
                action.callbackDataFind.result.pageInfo.resultsPerPage,
              part: "id,snippet",
              pageToken: state$.value.callbackDataFind.query.pageToken,
              regionCode: env.GOOGLE_API_REGION_CODE
            }
          })
        );
      }
    }
    return of(action);
  };

  return action$.pipe(
    ofType(actions.callbackDataFind.CALLBACK_DATA_FIND_QUERY),
    switchMap(actionObservable),
    switchMap(xxx)
  );
};

export { callbackDataFind };
