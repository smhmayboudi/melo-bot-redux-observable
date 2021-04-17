import FormData from "form-data";
import * as http from "http";
import { Observable } from "rxjs";
import { fromPromise } from "rxjs/internal/observable/fromPromise";

import { request } from "./request";

const requestUploadObservable: <T>(
  options: http.RequestOptions,
  formData: FormData
) => Observable<T> = <T>(
  options: http.RequestOptions,
  formData: FormData
): Observable<T> => fromPromise<T>(request<T>(options, formData));

export { requestUploadObservable };
