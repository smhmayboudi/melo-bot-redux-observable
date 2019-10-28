import { IStateSendAudioQuery } from "../../types/iStateSendAudioQuery";
import { IStateSendVideoQuery } from "../../types/iStateSendVideoQuery";

import {
  transformStateSendAudioQuery,
  transformStateSendVideoQuery
} from "./formData";

describe("formData utils", (): void => {
  const sendAudioQueryNoCaption: IStateSendAudioQuery = {
    audio: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    parse_mode: "HTML",
    performer: "",
    reply_to_message_id: 0,
    thumb: "",
    title: ""
  };
  const sendAudioQueryNoDisableNotification: IStateSendAudioQuery = {
    audio: "",
    caption: "",
    chat_id: 0,
    duration: 0,
    parse_mode: "HTML",
    performer: "",
    reply_to_message_id: 0,
    thumb: "",
    title: ""
  };
  const sendAudioQueryNoDuration: IStateSendAudioQuery = {
    audio: "",
    caption: "",
    chat_id: 0,
    disable_notification: true,
    parse_mode: "HTML",
    performer: "",
    reply_to_message_id: 0,
    thumb: "",
    title: ""
  };
  const sendAudioQueryNoParseMode: IStateSendAudioQuery = {
    audio: "",
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    performer: "",
    reply_to_message_id: 0,
    thumb: "",
    title: ""
  };
  const sendAudioQueryNoPerformer: IStateSendAudioQuery = {
    audio: "",
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    parse_mode: "HTML",
    reply_to_message_id: 0,
    thumb: "",
    title: ""
  };
  const sendAudioQueryNoReplyMarkup: IStateSendAudioQuery = {
    audio: "",
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    parse_mode: "HTML",
    performer: "",
    reply_to_message_id: 0,
    thumb: "",
    title: ""
  };
  const sendAudioQueryNoReplyToMessageId: IStateSendAudioQuery = {
    audio: "",
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    parse_mode: "HTML",
    performer: "",
    thumb: "",
    title: ""
  };
  const sendAudioQueryNoThumb: IStateSendAudioQuery = {
    audio: "",
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    parse_mode: "HTML",
    performer: "",
    reply_to_message_id: 0,
    title: ""
  };
  const sendAudioQueryNoTitle: IStateSendAudioQuery = {
    audio: "",
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    parse_mode: "HTML",
    performer: "",
    reply_to_message_id: 0,
    thumb: ""
  };
  const sendVideoQueryNoCaption: IStateSendVideoQuery = {
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    height: 0,
    parse_mode: "HTML",
    reply_to_message_id: 0,
    supports_streaming: true,
    thumb: "",
    video: "",
    width: 0
  };
  const sendVideoQueryNoDisableNotification: IStateSendVideoQuery = {
    caption: "",
    chat_id: 0,
    duration: 0,
    height: 0,
    parse_mode: "HTML",
    reply_to_message_id: 0,
    supports_streaming: true,
    thumb: "",
    video: "",
    width: 0
  };
  const sendVideoQueryNoDuration: IStateSendVideoQuery = {
    caption: "",
    chat_id: 0,
    disable_notification: true,
    height: 0,
    parse_mode: "HTML",
    reply_to_message_id: 0,
    supports_streaming: true,
    thumb: "",
    video: "",
    width: 0
  };
  const sendVideoQueryNoParseMode: IStateSendVideoQuery = {
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    height: 0,
    reply_to_message_id: 0,
    supports_streaming: true,
    thumb: "",
    video: "",
    width: 0
  };
  const sendVideoQueryNoHeight: IStateSendVideoQuery = {
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    parse_mode: "HTML",
    reply_to_message_id: 0,
    supports_streaming: true,
    thumb: "",
    video: "",
    width: 0
  };
  const sendVideoQueryNoReplyMarkup: IStateSendVideoQuery = {
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    height: 0,
    parse_mode: "HTML",
    reply_to_message_id: 0,
    supports_streaming: true,
    thumb: "",
    video: "",
    width: 0
  };
  const sendVideoQueryNoReplyToMessageId: IStateSendVideoQuery = {
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    height: 0,
    parse_mode: "HTML",
    supports_streaming: true,
    thumb: "",
    video: "",
    width: 0
  };
  const sendVideoQueryNoSupportsStreaming: IStateSendVideoQuery = {
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    height: 0,
    parse_mode: "HTML",
    reply_to_message_id: 0,
    thumb: "",
    video: "",
    width: 0
  };
  const sendVideoQueryNoThumb: IStateSendVideoQuery = {
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    height: 0,
    parse_mode: "HTML",
    reply_to_message_id: 0,
    supports_streaming: true,
    video: "",
    width: 0
  };
  const sendVideoQueryNoWidth: IStateSendVideoQuery = {
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    height: 0,
    parse_mode: "HTML",
    reply_to_message_id: 0,
    supports_streaming: true,
    thumb: "",
    video: ""
  };

  test("should handle transformStateSendVideoQuery sendAudioQueryNoCaption", (): void => {
    expect(transformStateSendAudioQuery(sendAudioQueryNoCaption)).toEqual("");
  });

  test("should handle transformStateSendVideoQuery sendAudioQueryNoDisableNotification", (): void => {
    expect(
      transformStateSendAudioQuery(sendAudioQueryNoDisableNotification)
    ).toEqual("");
  });

  test("should handle transformStateSendVideoQuery sendAudioQueryNoDuration", (): void => {
    expect(transformStateSendAudioQuery(sendAudioQueryNoDuration)).toEqual("");
  });

  test("should handle transformStateSendVideoQuery sendAudioQueryNoParseMode", (): void => {
    expect(transformStateSendAudioQuery(sendAudioQueryNoParseMode)).toEqual("");
  });

  test("should handle transformStateSendVideoQuery sendAudioQueryNoPerformer", (): void => {
    expect(transformStateSendAudioQuery(sendAudioQueryNoPerformer)).toEqual("");
  });

  test("should handle transformStateSendVideoQuery sendAudioQueryNoReplyMarkup", (): void => {
    expect(transformStateSendAudioQuery(sendAudioQueryNoReplyMarkup)).toEqual(
      ""
    );
  });

  test("should handle transformStateSendVideoQuery sendAudioQueryNoReplyToMessageId", (): void => {
    expect(
      transformStateSendAudioQuery(sendAudioQueryNoReplyToMessageId)
    ).toEqual("");
  });

  test("should handle transformStateSendVideoQuery sendAudioQueryNoThumb", (): void => {
    expect(transformStateSendAudioQuery(sendAudioQueryNoThumb)).toEqual("");
  });

  test("should handle transformStateSendVideoQuery sendAudioQueryNoTitle", (): void => {
    expect(transformStateSendAudioQuery(sendAudioQueryNoTitle)).toEqual("");
  });

  test("should handle transformStateSendVideoQuery no caption", (): void => {
    expect(transformStateSendVideoQuery(sendVideoQueryNoCaption)).toEqual("");
  });

  test("should handle transformStateSendVideoQuery no disableNotification", (): void => {
    expect(
      transformStateSendVideoQuery(sendVideoQueryNoDisableNotification)
    ).toEqual("");
  });

  test("should handle transformStateSendVideoQuery no duration", (): void => {
    expect(transformStateSendVideoQuery(sendVideoQueryNoDuration)).toEqual("");
  });

  test("should handle transformStateSendVideoQuery no parseMode", (): void => {
    expect(transformStateSendVideoQuery(sendVideoQueryNoParseMode)).toEqual("");
  });

  test("should handle transformStateSendVideoQuery no height", (): void => {
    expect(transformStateSendVideoQuery(sendVideoQueryNoHeight)).toEqual("");
  });

  test("should handle transformStateSendVideoQuery no replyToMessageId", (): void => {
    expect(
      transformStateSendVideoQuery(sendVideoQueryNoReplyToMessageId)
    ).toEqual("");
  });

  test("should handle transformStateSendVideoQuery no supportsStreaming", (): void => {
    expect(
      transformStateSendVideoQuery(sendVideoQueryNoSupportsStreaming)
    ).toEqual("");
  });

  test("should handle transformStateSendVideoQuery no thumb", (): void => {
    expect(transformStateSendVideoQuery(sendVideoQueryNoThumb)).toEqual("");
  });

  test("should handle transformStateSendVideoQuery no width", (): void => {
    expect(transformStateSendVideoQuery(sendVideoQueryNoWidth)).toEqual("");
  });
});
