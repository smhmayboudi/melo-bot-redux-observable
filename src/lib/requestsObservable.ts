import * as http from "http";
import { Observable } from "rxjs";
import { fromPromise } from "rxjs/internal/observable/fromPromise";

import { requests } from "./requests";

const requestsObservable:
  (options: http.RequestOptions, data?: any) => Observable<any> =
  (options: http.RequestOptions, data?: any): Observable<any> =>
    fromPromise(requests(options, data));

export { requestsObservable };
