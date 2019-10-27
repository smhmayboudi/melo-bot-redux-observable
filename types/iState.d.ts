import { IStateAnswerInlineQuery } from "./iStateAnswerInlineQuery";
import { IStateChosenInlineResult } from "./iStateChosenInlineResult";
import { IStateDeleteWebhook } from "./iStateDeleteWebhook";
import { IStateGetChatMember } from "./iStateGetChatMember";
import { IStateGetUpdates } from "./iStateGetUpdates";
import { IStateInlineQuery } from "./iStateInlineQuery";
import { IStateMessage } from "./iStateMessage";
import { IStateSendAudio } from "./iStateSendAudio";
import { IStateSendMessage } from "./iStateSendMessage";
import { IStateSendVideo } from "./iStateSendVideo";
import { IStateSetWebhook } from "./iStateSetWebhook";
import { IStateYoutubeDownload } from "./iStateYoutubeDownload";
import { IStateYoutubeSearchList } from "./iStateYoutubeSearchList";
import { IStateYoutubeVideoList } from "./iStateYoutubeVideoList";

export interface IState {
  answerInlineQuery: IStateAnswerInlineQuery;
  chosenInlineResult: IStateChosenInlineResult;
  deleteWebhook: IStateDeleteWebhook;
  getChatMember: IStateGetChatMember;
  getUpdates: IStateGetUpdates;
  inlineQuery: IStateInlineQuery;
  message: IStateMessage;
  sendAudio: IStateSendAudio;
  sendMessage: IStateSendMessage;
  sendVideo: IStateSendVideo;
  setWebhook: IStateSetWebhook;
  youtubeDownload: IStateYoutubeDownload;
  youtubeSearchList: IStateYoutubeSearchList;
  youtubeVideoList: IStateYoutubeVideoList;
}
