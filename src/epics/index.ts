import { Action } from "redux";
import { combineEpics, Epic } from "redux-observable";

import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";

import { appError } from "./appError";
import { getChatMember } from "./getChatMember";
import { literate } from "./literate";
import { sendAudio } from "./sendAudio";
import { sendMessage } from "./sendMessage";
import { sendVideo } from "./sendVideo";
import { youtubeDownload } from "./youtubeDownload";
import { youtubeSearchList } from "./youtubeSearchList";
import { youtubeVideoList } from "./youtubeVideoList";

const index: Epic<Action<string>, Action<string>, IState, IDependencies> = combineEpics(
  appError,
  getChatMember,
  literate,
  sendAudio,
  sendMessage,
  sendVideo,
  youtubeDownload,
  youtubeSearchList,
  youtubeVideoList,
) as Epic<Action<string>, Action<string>, IState, IDependencies>;

export { index };
