import FormData from "form-data";

import { IStateSendAudioQuery } from "../../types/iStateSendAudioQuery";
import { IStateSendVideoQuery } from "../../types/iStateSendVideoQuery";

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

export { transformSendAudioQuery, transformSendVideoQuery };
