import { IStateAnswerInlineQuery } from "./iStateAnswerInlineQuery";
import { IStateGetChatMember } from "./iStateGetChatMember";
import { IStateInlineQuery } from "./iStateInlineQuery";
import { IStateLiterate } from "./iStateLiterate";
import { IStateMessage } from "./iStateMessage";
import { IStateSendAudio } from "./iStateSendAudio";
import { IStateSendMessage } from "./iStateSendMessage";
import { IStateSendVideo } from "./iStateSendVideo";
import { IStateYoutubeDownload } from "./iStateYoutubeDownload";
import { IStateYoutubeSearchList } from "./iStateYoutubeSearchList";
import { IStateYoutubeVideoList } from "./iStateYoutubeVideoList";

export interface IState {
  answerInlineQuery: IStateAnswerInlineQuery;
  getChatMember: IStateGetChatMember;
  inlineQuery: IStateInlineQuery;
  literate: IStateLiterate;
  message: IStateMessage;
  sendAudio: IStateSendAudio;
  sendMessage: IStateSendMessage;
  sendVideo: IStateSendVideo;
  youtubeDownload: IStateYoutubeDownload;
  youtubeSearchList: IStateYoutubeSearchList;
  youtubeVideoList: IStateYoutubeVideoList;
}
