import { IStateSendAudioQuery } from "../../types/iStateSendAudioQuery";
import { IStateSendVideoQuery } from "../../types/iStateSendVideoQuery";

import { transformSendAudioQuery, transformSendVideoQuery } from "./formData";

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

  test("should handle transformSendVideoQuery sendAudioQueryNoCaption", (): void => {
    expect(transformSendAudioQuery(sendAudioQueryNoCaption)).toEqual("");
  });

  test("should handle transformSendVideoQuery sendAudioQueryNoDisableNotification", (): void => {
    expect(
      transformSendAudioQuery(sendAudioQueryNoDisableNotification)
    ).toEqual("");
  });

  test("should handle transformSendVideoQuery sendAudioQueryNoDuration", (): void => {
    expect(transformSendAudioQuery(sendAudioQueryNoDuration)).toEqual("");
  });

  test("should handle transformSendVideoQuery sendAudioQueryNoParseMode", (): void => {
    expect(transformSendAudioQuery(sendAudioQueryNoParseMode)).toEqual("");
  });

  test("should handle transformSendVideoQuery sendAudioQueryNoPerformer", (): void => {
    expect(transformSendAudioQuery(sendAudioQueryNoPerformer)).toEqual("");
  });

  test("should handle transformSendVideoQuery sendAudioQueryNoReplyMarkup", (): void => {
    expect(transformSendAudioQuery(sendAudioQueryNoReplyMarkup)).toEqual("");
  });

  test("should handle transformSendVideoQuery sendAudioQueryNoReplyToMessageId", (): void => {
    expect(transformSendAudioQuery(sendAudioQueryNoReplyToMessageId)).toEqual(
      ""
    );
  });

  test("should handle transformSendVideoQuery sendAudioQueryNoThumb", (): void => {
    expect(transformSendAudioQuery(sendAudioQueryNoThumb)).toEqual("");
  });

  test("should handle transformSendVideoQuery sendAudioQueryNoTitle", (): void => {
    expect(transformSendAudioQuery(sendAudioQueryNoTitle)).toEqual("");
  });

  test("should handle transformSendVideoQuery no caption", (): void => {
    expect(transformSendVideoQuery(sendVideoQueryNoCaption)).toEqual("");
  });

  test("should handle transformSendVideoQuery no disableNotification", (): void => {
    expect(
      transformSendVideoQuery(sendVideoQueryNoDisableNotification)
    ).toEqual("");
  });

  test("should handle transformSendVideoQuery no duration", (): void => {
    expect(transformSendVideoQuery(sendVideoQueryNoDuration)).toEqual("");
  });

  test("should handle transformSendVideoQuery no parseMode", (): void => {
    expect(transformSendVideoQuery(sendVideoQueryNoParseMode)).toEqual("");
  });

  test("should handle transformSendVideoQuery no height", (): void => {
    expect(transformSendVideoQuery(sendVideoQueryNoHeight)).toEqual("");
  });

  test("should handle transformSendVideoQuery no replyToMessageId", (): void => {
    expect(transformSendVideoQuery(sendVideoQueryNoReplyToMessageId)).toEqual(
      ""
    );
  });

  test("should handle transformSendVideoQuery no supportsStreaming", (): void => {
    expect(transformSendVideoQuery(sendVideoQueryNoSupportsStreaming)).toEqual(
      ""
    );
  });

  test("should handle transformSendVideoQuery no thumb", (): void => {
    expect(transformSendVideoQuery(sendVideoQueryNoThumb)).toEqual("");
  });

  test("should handle transformSendVideoQuery no width", (): void => {
    expect(transformSendVideoQuery(sendVideoQueryNoWidth)).toEqual("");
  });
});
