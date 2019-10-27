import { Action } from "redux";
import { combineEpics, Epic } from "redux-observable";

import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";

import { answerCallbackQuery } from "./answerCallbackQuery";
import { answerInlineQuery } from "./answerInlineQuery";
import { appError } from "./appError";
import { chosenInlineResult } from "./chosenInlineResult";
import { getChatMember } from "./getChatMember";
import { getUpdates } from "./getUpdates";
import { inlineQuery } from "./inlineQuery";
import { sendAudio } from "./sendAudio";
import { sendMessage } from "./sendMessage";
import { sendVideo } from "./sendVideo";
import { setWebhook } from "./setWebhook";
import { youtubeDownload } from "./youtubeDownload";
import { youtubeSearchList } from "./youtubeSearchList";
import { youtubeVideoList } from "./youtubeVideoList";

const index: Epic<
  Action<string>,
  Action<string>,
  IState,
  IDependencies
> = combineEpics(
  answerCallbackQuery,
  answerInlineQuery,
  appError,
  chosenInlineResult,
  getChatMember,
  getUpdates,
  inlineQuery,
  sendAudio,
  sendMessage,
  sendVideo,
  setWebhook,
  youtubeDownload,
  youtubeSearchList,
  youtubeVideoList
) as Epic<Action<string>, Action<string>, IState, IDependencies>;

export { index };
