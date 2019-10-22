import { combineReducers, Reducer } from "redux";

import { IStateAnswerInlineQuery } from "../../types/iStateAnswerInlineQuery";
import { IStateGetChatMember } from "../../types/iStateGetChatMember";
import { IStateInlineQuery } from "../../types/iStateInlineQuery";
import { IStateLiterate } from "../../types/iStateLiterate";
import { IStateMessage } from "../../types/iStateMessage";
import { IStateSendAudio } from "../../types/iStateSendAudio";
import { IStateSendMessage } from "../../types/iStateSendMessage";
import { IStateSendVideo } from "../../types/iStateSendVideo";
import { IStateYoutubeDownload } from "../../types/iStateYoutubeDownload";
import { IStateYoutubeSearchList } from "../../types/iStateYoutubeSearchList";
import { IStateYoutubeVideoList } from "../../types/iStateYoutubeVideoList";

import { answerInlineQuery } from "./answerInlineQuery";
import { getChatMember } from "./getChatMember";
import { inlineQuery } from "./inlineQuery";
import { literate } from "./literate";
import { message } from "./message";
import { sendAudio } from "./sendAudio";
import { sendMessage } from "./sendMessage";
import { sendVideo } from "./sendVideo";
import { youtubeDownload } from "./youtubeDownload";
import { youtubeSearchList } from "./youtubeSearchList";
import { youtubeVideoList } from "./youtubeVideoList";

const index: Reducer<{
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
}> = combineReducers({
  answerInlineQuery,
  getChatMember,
  inlineQuery,
  literate,
  message,
  sendAudio,
  sendMessage,
  sendVideo,
  youtubeDownload,
  youtubeSearchList,
  youtubeVideoList
});

export { index };
