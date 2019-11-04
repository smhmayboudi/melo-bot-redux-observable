import FormData from "form-data";

import { IStateAddStickerToSetQuery } from "../../types/iStateAddStickerToSetQuery";
import { IStateCreateNewStickerSetQuery } from "../../types/iStateCreateNewStickerSetQuery";
import { IStateSendAnimationQuery } from "../../types/iStateSendAnimationQuery";
import { IStateSendAudioQuery } from "../../types/iStateSendAudioQuery";
import { IStateSendDocumentQuery } from "../../types/iStateSendDocumentQuery";
import { IStateSendMediaGroupQuery } from "../../types/iStateSendMediaGroupQuery";
import { IStateSendStickerQuery } from "../../types/iStateSendStickerQuery";
import { IStateSendVideoQuery } from "../../types/iStateSendVideoQuery";
import { IStateSendVoiceQuery } from "../../types/iStateSendVoiceQuery";
import { IStateSendVideoNoteQuery } from "../../types/iStateSendVideoNoteQuery";
import { IStateSendPhotoQuery } from "../../types/iStateSendPhotoQuery";

const transformAddStickerToSetQuery: (
  query: IStateAddStickerToSetQuery
) => FormData = (query: IStateAddStickerToSetQuery): FormData => {
  const formData: FormData = new FormData();
  formData.append("emojis", query.emojis);
  if (query.mask_position !== undefined) {
    formData.append("mask_position", query.mask_position);
  }
  formData.append("name", query.name);
  formData.append("png_sticker", `${query.png_sticker}`);
  formData.append("user_id", `${query.user_id}`);

  return formData;
};

const transformCreateNewStickerSetQuery: (
  query: IStateCreateNewStickerSetQuery
) => FormData = (query: IStateCreateNewStickerSetQuery): FormData => {
  const formData: FormData = new FormData();
  formData.append("emojis", query.emojis);
  if (query.mask_position !== undefined) {
    formData.append("mask_position", query.mask_position);
  }
  formData.append("name", query.name);
  formData.append("png_sticker", `${query.png_sticker}`);
  formData.append("user_id", `${query.user_id}`);

  return formData;
};

const transformSenAnimationQuery: (
  query: IStateSendAnimationQuery
) => FormData = (query: IStateSendAnimationQuery): FormData => {
  const formData: FormData = new FormData();
  formData.append("animation", query.animation);
  if (query.caption !== undefined) {
    formData.append("caption", query.caption);
  }
  formData.append("chat_id", query.chat_id);
  if (query.disable_notification !== undefined) {
    formData.append("disable_notification", `${query.disable_notification}`);
  }
  if (query.duration !== undefined) {
    formData.append("duration", `${query.duration}`);
  }
  if (query.parse_mode !== undefined) {
    formData.append("parse_mode", `${query.parse_mode}`);
  }
  if (query.height !== undefined) {
    formData.append("height", `${query.height}`);
  }
  if (query.parse_mode !== undefined) {
    formData.append("parse_mode", `${query.parse_mode}`);
  }

  if (query.reply_markup !== undefined) {
    formData.append("reply_markup", JSON.stringify(query.reply_markup));
  }
  if (query.reply_to_message_id !== undefined) {
    formData.append("reply_to_message_id", query.reply_to_message_id);
  }
  if (query.thumb !== undefined) {
    formData.append("thumb", `${String(query.thumb)}`);
  }
  if (query.width !== undefined) {
    formData.append("width", query.width);
  }

  return formData;
};

const transformSendAudioQuery: (query: IStateSendAudioQuery) => FormData = (
  query: IStateSendAudioQuery
): FormData => {
  const formData: FormData = new FormData();
  formData.append("audio", query.audio);
  if (query.caption !== undefined) {
    formData.append("caption", query.caption);
  }
  formData.append("chat_id", query.chat_id);
  if (query.disable_notification !== undefined) {
    formData.append("disable_notification", `${query.disable_notification}`);
  }
  if (query.duration !== undefined) {
    formData.append("duration", `${query.duration}`);
  }
  if (query.parse_mode !== undefined) {
    formData.append("parse_mode", `${query.parse_mode}`);
  }
  if (query.performer !== undefined) {
    formData.append("performer", `${query.performer}`);
  }
  if (query.reply_markup !== undefined) {
    formData.append("reply_markup", JSON.stringify(query.reply_markup));
  }
  if (query.reply_to_message_id !== undefined) {
    formData.append("reply_to_message_id", query.reply_to_message_id);
  }
  if (query.thumb !== undefined) {
    formData.append("thumb", `${String(query.thumb)}`);
  }
  if (query.title !== undefined) {
    formData.append("title", query.title);
  }

  return formData;
};

const transformSendDocumentQuery: (
  query: IStateSendDocumentQuery
) => FormData = (query: IStateSendDocumentQuery): FormData => {
  const formData: FormData = new FormData();
  if (query.caption !== undefined) {
    formData.append("caption", query.caption);
  }
  formData.append("chat_id", query.chat_id);
  if (query.disable_notification !== undefined) {
    formData.append("disable_notification", `${query.disable_notification}`);
  }
  formData.append("document", query.document);
  if (query.parse_mode !== undefined) {
    formData.append("parse_mode", `${query.parse_mode}`);
  }
  if (query.reply_markup !== undefined) {
    formData.append("reply_markup", JSON.stringify(query.reply_markup));
  }
  if (query.reply_to_message_id !== undefined) {
    formData.append("reply_to_message_id", query.reply_to_message_id);
  }
  formData.append("thumb", query.thumb);

  return formData;
};

const transformSendMediaGroupQuery: (
  query: IStateSendMediaGroupQuery
) => FormData = (query: IStateSendMediaGroupQuery): FormData => {
  const formData: FormData = new FormData();
  formData.append("chat_id", query.chat_id);
  if (query.disable_notification !== undefined) {
    formData.append("disable_notification", `${query.disable_notification}`);
  }
  formData.append("media", query.media);
  if (query.reply_to_message_id !== undefined) {
    formData.append("reply_to_message_id", query.reply_to_message_id);
  }

  return formData;
};

const transformSendStickerQuery: (query: IStateSendStickerQuery) => FormData = (
  query: IStateSendStickerQuery
): FormData => {
  const formData: FormData = new FormData();
  formData.append("chat_id", query.chat_id);
  if (query.disable_notification !== undefined) {
    formData.append("disable_notification", `${query.disable_notification}`);
  }
  if (query.reply_markup !== undefined) {
    formData.append("reply_markup", JSON.stringify(query.reply_markup));
  }
  if (query.reply_to_message_id !== undefined) {
    formData.append("reply_to_message_id", query.reply_to_message_id);
  }
  formData.append("sticker", query.sticker);

  return formData;
};

const transformSendVideoNoteQuery: (
  query: IStateSendVideoNoteQuery
) => FormData = (query: IStateSendVideoNoteQuery): FormData => {
  const formData: FormData = new FormData();
  formData.append("chat_id", query.chat_id);
  if (query.disable_notification !== undefined) {
    formData.append("disable_notification", `${query.disable_notification}`);
  }
  if (query.duration !== undefined) {
    formData.append("duration", query.duration);
  }
  if (query.duration !== undefined) {
    formData.append("duration", `${query.duration}`);
  }
  if (query.length !== undefined) {
    formData.append("length", query.length);
  }
  if (query.reply_markup !== undefined) {
    formData.append("reply_markup", JSON.stringify(query.reply_markup));
  }
  if (query.reply_to_message_id !== undefined) {
    formData.append("reply_to_message_id", query.reply_to_message_id);
  }
  if (query.thumb !== undefined) {
    formData.append("thumb", query.thumb);
  }
  formData.append("video_note", query.video_note);

  return formData;
};

const transformSendVideoQuery: (query: IStateSendVideoQuery) => FormData = (
  query: IStateSendVideoQuery
): FormData => {
  const formData: FormData = new FormData();
  if (query.caption !== undefined) {
    formData.append("caption", query.caption);
  }
  formData.append("chat_id", query.chat_id);
  if (query.disable_notification !== undefined) {
    formData.append("disable_notification", `${query.disable_notification}`);
  }
  if (query.duration !== undefined) {
    formData.append("duration", query.duration);
  }
  if (query.height !== undefined) {
    formData.append("height", query.height);
  }
  if (query.parse_mode !== undefined) {
    formData.append("parse_mode", query.parse_mode);
  }
  if (query.reply_markup !== undefined) {
    formData.append("reply_markup", JSON.stringify(query.reply_markup));
  }
  if (query.reply_to_message_id !== undefined) {
    formData.append("reply_to_message_id", query.reply_to_message_id);
  }
  if (query.supports_streaming !== undefined) {
    formData.append("supports_streaming", `${query.supports_streaming}`);
  }
  if (query.thumb !== undefined) {
    formData.append("thumb", query.thumb);
  }
  formData.append("video", query.video);
  if (query.width !== undefined) {
    formData.append("width", query.width);
  }

  return formData;
};

const transformSendVoiceQuery: (query: IStateSendVoiceQuery) => FormData = (
  query: IStateSendVoiceQuery
): FormData => {
  const formData: FormData = new FormData();
  if (query.caption !== undefined) {
    formData.append("caption", query.caption);
  }
  formData.append("chat_id", query.chat_id);
  if (query.disable_notification !== undefined) {
    formData.append("disable_notification", `${query.disable_notification}`);
  }
  if (query.duration !== undefined) {
    formData.append("duration", `${query.duration}`);
  }
  if (query.parse_mode !== undefined) {
    formData.append("parse_mode", `${query.parse_mode}`);
  }
  if (query.reply_markup !== undefined) {
    formData.append("reply_markup", JSON.stringify(query.reply_markup));
  }
  if (query.reply_to_message_id !== undefined) {
    formData.append("reply_to_message_id", query.reply_to_message_id);
  }
  formData.append("voice", query.voice);

  return formData;
};

const transformSendPhotoQuery: (query: IStateSendPhotoQuery) => FormData = (
  query: IStateSendPhotoQuery
): FormData => {
  const formData: FormData = new FormData();
  if (query.caption !== undefined) {
    formData.append("caption", query.caption);
  }
  formData.append("chat_id", query.chat_id);
  if (query.disable_notification !== undefined) {
    formData.append("disable_notification", `${query.disable_notification}`);
  }
  if (query.parse_mode !== undefined) {
    formData.append("parse_mode", `${query.parse_mode}`);
  }
  formData.append("photo", query.photo);
  if (query.reply_markup !== undefined) {
    formData.append("reply_markup", JSON.stringify(query.reply_markup));
  }
  if (query.reply_to_message_id !== undefined) {
    formData.append("reply_to_message_id", query.reply_to_message_id);
  }

  return formData;
};

export {
  transformAddStickerToSetQuery,
  transformCreateNewStickerSetQuery,
  transformSenAnimationQuery,
  transformSendAudioQuery,
  transformSendDocumentQuery,
  transformSendMediaGroupQuery,
  transformSendStickerQuery,
  transformSendVideoNoteQuery,
  transformSendVideoQuery,
  transformSendVoiceQuery,
  transformSendPhotoQuery
};
