import { Action } from "redux";
import { combineEpics, Epic } from "redux-observable";

import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";

import { answerInlineQuery } from "./answerInlineQuery";
import { appError } from "./appError";
import { chosenInlineResult } from "./chosenInlineResult";
import { getChatMember } from "./getChatMember";
import { inlineQuery } from "./inlineQuery";
import { literate } from "./literate";
import { sendAudio } from "./sendAudio";
import { sendMessage } from "./sendMessage";
import { sendVideo } from "./sendVideo";
import { youtubeDownload } from "./youtubeDownload";
import { youtubeSearchList } from "./youtubeSearchList";
import { youtubeVideoList } from "./youtubeVideoList";

const index: Epic<
  Action<string>,
  Action<string>,
  IState,
  IDependencies
> = combineEpics(
  answerInlineQuery,
  appError,
  chosenInlineResult,
  getChatMember,
  inlineQuery,
  literate,
  sendAudio,
  sendMessage,
  sendVideo,
  youtubeDownload,
  youtubeSearchList,
  youtubeVideoList
) as Epic<Action<string>, Action<string>, IState, IDependencies>;

export { index };
