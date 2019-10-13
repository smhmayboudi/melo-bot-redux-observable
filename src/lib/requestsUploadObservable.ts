import * as FormData from "form-data";
import * as http from "http";
import { Observable } from "rxjs";
import { fromPromise } from "rxjs/internal/observable/fromPromise";

import { requestsUpload } from "./requestsUpload";

const requestsUploadObservable:
  (options: http.RequestOptions, formData: FormData) => Observable<any> =
  (options: http.RequestOptions, formData: FormData): Observable<any> =>
    fromPromise(requestsUpload(options, formData));

export { requestsUploadObservable };
