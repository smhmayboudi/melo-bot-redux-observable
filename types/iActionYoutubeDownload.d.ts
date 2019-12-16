import { IAction } from "./iAction";
import { IStateYoutubeDownload } from "./iStateYoutubeDownload";

export interface IActionYoutubeDownload extends IAction {
  youtubeDownload: IStateYoutubeDownload;
}
