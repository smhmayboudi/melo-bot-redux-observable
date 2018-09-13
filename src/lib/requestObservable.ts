import * as http from "http";
import { Observable } from "rxjs";
import { fromPromise } from "rxjs/internal/observable/fromPromise";
import { request } from "./request";

const requestObservable:
  (options: http.RequestOptions, data?: any) => Observable<any> =
  (options: http.RequestOptions, data?: any): Observable<any> =>
    fromPromise(request(options, data));

export { requestObservable };
