import { combineReducers, Reducer } from "redux";

import { IStateAnswerCallbackQuery } from "../../types/iStateAnswerCallbackQuery";
import { IStateAnswerInlineQuery } from "../../types/iStateAnswerInlineQuery";
import { IStateChosenInlineResult } from "../../types/iStateChosenInlineResult";
import { IStateGetChatMember } from "../../types/iStateGetChatMember";
import { IStateInlineQuery } from "../../types/iStateInlineQuery";
import { IStateMessage } from "../../types/iStateMessage";
import { IStateSendAudio } from "../../types/iStateSendAudio";
import { IStateSendMessage } from "../../types/iStateSendMessage";
import { IStateSendVideo } from "../../types/iStateSendVideo";
import { IStateYoutubeDownload } from "../../types/iStateYoutubeDownload";
import { IStateYoutubeSearchList } from "../../types/iStateYoutubeSearchList";
import { IStateYoutubeVideoList } from "../../types/iStateYoutubeVideoList";

import { answerCallbackQuery } from "./answerCallbackQuery";
import { answerInlineQuery } from "./answerInlineQuery";
import { chosenInlineResult } from "./chosenInlineResult";
import { getChatMember } from "./getChatMember";
import { inlineQuery } from "./inlineQuery";
import { message } from "./message";
import { sendAudio } from "./sendAudio";
import { sendMessage } from "./sendMessage";
import { sendVideo } from "./sendVideo";
import { youtubeDownload } from "./youtubeDownload";
import { youtubeSearchList } from "./youtubeSearchList";
import { youtubeVideoList } from "./youtubeVideoList";

const index: Reducer<{
  AnswerCallbackQuery: IStateAnswerCallbackQuery;
  answerInlineQuery: IStateAnswerInlineQuery;
  chosenInlineResult: IStateChosenInlineResult;
  getChatMember: IStateGetChatMember;
  inlineQuery: IStateInlineQuery;
  message: IStateMessage;
  sendAudio: IStateSendAudio;
  sendMessage: IStateSendMessage;
  sendVideo: IStateSendVideo;
  youtubeDownload: IStateYoutubeDownload;
  youtubeSearchList: IStateYoutubeSearchList;
  youtubeVideoList: IStateYoutubeVideoList;
}> = combineReducers({
  answerCallbackQuery,
  answerInlineQuery,
  chosenInlineResult,
  getChatMember,
  inlineQuery,
  message,
  sendAudio,
  sendMessage,
  sendVideo,
  youtubeDownload,
  youtubeSearchList,
  youtubeVideoList
});

export { index };
