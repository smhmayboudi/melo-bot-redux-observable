import * as FormData from "form-data";
import * as http from "http";
import { Observable } from "rxjs";
import { fromPromise } from "rxjs/internal/observable/fromPromise";
import { request } from "./request";

const requestUploadObservable:
  (options: http.RequestOptions, formData: FormData) => Observable<any> =
  (options: http.RequestOptions, formData: FormData): Observable<any> =>
    fromPromise(request(options, formData));

export { requestUploadObservable };
