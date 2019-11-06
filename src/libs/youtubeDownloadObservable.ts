import { Observable } from "rxjs";
import { fromPromise } from "rxjs/internal/observable/fromPromise";

import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";
import { youtubeDownload } from "./youtubeDownload";

const youtubeDownloadObservable: (
  videoId: string
) => Observable<IStateYoutubeDownloadResultInsertQuery> = (
  videoId: string
): Observable<IStateYoutubeDownloadResultInsertQuery> =>
  fromPromise(youtubeDownload(videoId));

export { youtubeDownloadObservable };
