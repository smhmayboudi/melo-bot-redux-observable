import { IAction } from "./iAction";
import { IStateYoutubeDownloadResultFind } from "./iStateYoutubeDownloadResultFind";

export interface IActionYoutubeDownloadResultFind extends IAction {
  youtubeDownloadResultFind: IStateYoutubeDownloadResultFind;
}
