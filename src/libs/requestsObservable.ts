import * as http from "http";
import { Observable } from "rxjs";
import { fromPromise } from "rxjs/internal/observable/fromPromise";

import { requests } from "./requests";

const requestsObservable: <T>(
  options: http.RequestOptions,
  data?: any
) => Observable<T> = <T>(
  options: http.RequestOptions,
  data?: any
): Observable<T> => fromPromise<T>(requests<T>(options, data));

export { requestsObservable };
