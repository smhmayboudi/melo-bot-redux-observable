import * as http from "http";
import { Observable } from "rxjs";
import { fromPromise } from "rxjs/internal/observable/fromPromise";

import { request } from "./request";

const requestObservable: <T>(
  options: http.RequestOptions,
  data?: any
) => Observable<T> = <T>(
  options: http.RequestOptions,
  data?: any
): Observable<T> => fromPromise<T>(request<T>(options, data));

export { requestObservable };
