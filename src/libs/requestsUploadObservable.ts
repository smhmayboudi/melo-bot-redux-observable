import FormData from "form-data";
import * as http from "http";
import { Observable } from "rxjs";
import { fromPromise } from "rxjs/internal/observable/fromPromise";

import { requestsUpload } from "./requestsUpload";

const requestsUploadObservable: <T>(
  options: http.RequestOptions,
  formData: FormData
) => Observable<T> = <T>(
  options: http.RequestOptions,
  formData: FormData
): Observable<T> => fromPromise<T>(requestsUpload<T>(options, formData));

export { requestsUploadObservable };
