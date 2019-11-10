import FormData from "form-data";

import { IStateAddStickerToSetQuery } from "../../types/iStateAddStickerToSetQuery";
import { IStateCreateNewStickerSetQuery } from "../../types/iStateCreateNewStickerSetQuery";
import { IStateSendAnimationQuery } from "../../types/iStateSendAnimationQuery";
import { IStateSendAudioQuery } from "../../types/iStateSendAudioQuery";
import { IStateSendDocumentQuery } from "../../types/iStateSendDocumentQuery";
import { IStateSendMediaGroupQuery } from "../../types/iStateSendMediaGroupQuery";
import { IStateSendStickerQuery } from "../../types/iStateSendStickerQuery";
import { IStateSendVideoNoteQuery } from "../../types/iStateSendVideoNoteQuery";
import { IStateSendVideoQuery } from "../../types/iStateSendVideoQuery";
import { IStateSendVoiceQuery } from "../../types/iStateSendVoiceQuery";
import { IStateSendPhotoQuery } from "../../types/iStateSendPhotoQuery";

import {
  transformAddStickerToSetQuery,
  transformCreateNewStickerSetQuery,
  transformSendAnimationQuery,
  transformSendAudioQuery,
  transformSendDocumentQuery,
  transformSendMediaGroupQuery,
  transformSendStickerQuery,
  transformSendVideoNoteQuery,
  transformSendVideoQuery,
  transformSendVoiceQuery,
  transformSendPhotoQuery
} from "./formData";

describe("formData utils", (): void => {
  describe("transformAddStickerToSetQuery", (): void => {
    const addStickerToSetQuery: IStateAddStickerToSetQuery = {
      emojis: "",
      mask_position: {
        point: "",
        scale: 0,
        x_shift: 0,
        y_shift: 0
      },
      name: "",
      png_sticker: "",
      user_id: 0
    };
    const addStickerToSetQueryNoMaskPosition: IStateAddStickerToSetQuery = {
      ...addStickerToSetQuery,
      mask_position: undefined
    };

    test("should handle transformAddStickerToSetQuery no maskPosition", (): void => {
      expect(
        transformAddStickerToSetQuery(addStickerToSetQueryNoMaskPosition)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformAddStickerToSetQuery", (): void => {
      expect(
        transformAddStickerToSetQuery(addStickerToSetQuery)
      ).toBeInstanceOf(FormData);
    });
  });

  describe("transformCreateNewStickerSetQuery", (): void => {
    const createNewStickerSetQuery: IStateCreateNewStickerSetQuery = {
      contains_masks: true,
      emojis: "",
      mask_position: {
        point: "",
        scale: 0,
        x_shift: 0,
        y_shift: 0
      },
      name: "",
      png_sticker: "",
      title: "",
      user_id: 0
    };
    const createNewStickerSetQueryNoContainsMasks: IStateCreateNewStickerSetQuery = {
      ...createNewStickerSetQuery,
      contains_masks: undefined
    };
    const createNewStickerSetQueryNoMaskPosition: IStateCreateNewStickerSetQuery = {
      ...createNewStickerSetQuery,
      mask_position: undefined
    };

    test("should handle transformCreateNewStickerSetQuery no containsMasks", (): void => {
      expect(
        transformCreateNewStickerSetQuery(
          createNewStickerSetQueryNoContainsMasks
        )
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformCreateNewStickerSetQuery no maskPosition", (): void => {
      expect(
        transformCreateNewStickerSetQuery(
          createNewStickerSetQueryNoMaskPosition
        )
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformCreateNewStickerSetQuery", (): void => {
      expect(
        transformCreateNewStickerSetQuery(createNewStickerSetQuery)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformCreateNewStickerSetQuery", (): void => {
      expect(
        transformCreateNewStickerSetQuery(createNewStickerSetQuery)
      ).toBeInstanceOf(FormData);
    });
  });

  describe("transformSendAnimationQuery", (): void => {
    const sendAnimationQuery: IStateSendAnimationQuery = {
      animation: "",
      caption: "",
      chat_id: 0,
      disable_notification: true,
      duration: 0,
      height: 0,
      parse_mode: "HTML",
      reply_markup: {
        force_reply: true
      },
      reply_to_message_id: 0,
      thumb: "",
      width: 0
    };
    const sendAnimationQueryNoCaption: IStateSendAnimationQuery = {
      ...sendAnimationQuery,
      caption: undefined
    };
    const sendAnimationQueryNoDisableNotification: IStateSendAnimationQuery = {
      ...sendAnimationQuery,
      disable_notification: undefined
    };
    const sendAnimationQueryNoDuration: IStateSendAnimationQuery = {
      ...sendAnimationQuery,
      duration: undefined
    };
    const sendAnimationQueryNoHeight: IStateSendAnimationQuery = {
      ...sendAnimationQuery,
      height: undefined
    };
    const sendAnimationQueryNoParseMode: IStateSendAnimationQuery = {
      ...sendAnimationQuery,
      parse_mode: undefined
    };
    const sendAnimationQueryNoReplyMarkup: IStateSendAnimationQuery = {
      ...sendAnimationQuery,
      reply_markup: undefined
    };
    const sendAnimationQueryNoReplyToMessageId: IStateSendAnimationQuery = {
      ...sendAnimationQuery,
      reply_to_message_id: undefined
    };
    const sendAnimationQueryNoThumb: IStateSendAnimationQuery = {
      ...sendAnimationQuery,
      thumb: undefined
    };
    const sendAnimationQueryNoWidth: IStateSendAnimationQuery = {
      ...sendAnimationQuery,
      width: undefined
    };

    test("should handle transformSendAnimationQuery no caption", (): void => {
      expect(
        transformSendAnimationQuery(sendAnimationQueryNoCaption)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendAnimationQuery no disableNotification", (): void => {
      expect(
        transformSendAnimationQuery(sendAnimationQueryNoDisableNotification)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendAnimationQuery no duration", (): void => {
      expect(
        transformSendAnimationQuery(sendAnimationQueryNoDuration)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendAnimationQuery no height", (): void => {
      expect(
        transformSendAnimationQuery(sendAnimationQueryNoHeight)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendAnimationQuery no parseMode", (): void => {
      expect(
        transformSendAnimationQuery(sendAnimationQueryNoParseMode)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendAnimationQuery no replyMarkup", (): void => {
      expect(
        transformSendAnimationQuery(sendAnimationQueryNoReplyMarkup)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendAnimationQuery no replyToMessageId", (): void => {
      expect(
        transformSendAnimationQuery(sendAnimationQueryNoReplyToMessageId)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendAnimationQuery no thumb", (): void => {
      expect(
        transformSendAnimationQuery(sendAnimationQueryNoThumb)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendAnimationQuery no width", (): void => {
      expect(
        transformSendAnimationQuery(sendAnimationQueryNoWidth)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendAnimationQuery", (): void => {
      expect(transformSendAnimationQuery(sendAnimationQuery)).toBeInstanceOf(
        FormData
      );
    });
  });

  describe("transformSendAudioQuery", (): void => {
    const sendAudioQuery: IStateSendAudioQuery = {
      audio: "",
      caption: "",
      chat_id: 0,
      disable_notification: true,
      duration: 0,
      parse_mode: "HTML",
      performer: "",
      reply_markup: {
        force_reply: true
      },
      reply_to_message_id: 0,
      thumb: "",
      title: ""
    };
    const sendAudioQueryNoCaption: IStateSendAudioQuery = {
      ...sendAudioQuery,
      caption: undefined
    };
    const sendAudioQueryNoDisableNotification: IStateSendAudioQuery = {
      ...sendAudioQuery,
      disable_notification: undefined
    };
    const sendAudioQueryNoDuration: IStateSendAudioQuery = {
      ...sendAudioQuery,
      duration: undefined
    };
    const sendAudioQueryNoParseMode: IStateSendAudioQuery = {
      ...sendAudioQuery,
      parse_mode: undefined
    };
    const sendAudioQueryNoPerformer: IStateSendAudioQuery = {
      ...sendAudioQuery,
      performer: undefined
    };
    const sendAudioQueryNoReplyMarkup: IStateSendAudioQuery = {
      ...sendAudioQuery,
      reply_markup: undefined
    };
    const sendAudioQueryNoReplyToMessageId: IStateSendAudioQuery = {
      ...sendAudioQuery,
      reply_to_message_id: undefined
    };
    const sendAudioQueryNoThumb: IStateSendAudioQuery = {
      ...sendAudioQuery,
      thumb: undefined
    };
    const sendAudioQueryNoTitle: IStateSendAudioQuery = {
      ...sendAudioQuery,
      title: undefined
    };

    test("should handle transformSendAudioQuery no caption", (): void => {
      expect(transformSendAudioQuery(sendAudioQueryNoCaption)).toBeInstanceOf(
        FormData
      );
    });

    test("should handle transformSendAudioQuery no disableNotification", (): void => {
      expect(
        transformSendAudioQuery(sendAudioQueryNoDisableNotification)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendAudioQuery no duration", (): void => {
      expect(transformSendAudioQuery(sendAudioQueryNoDuration)).toBeInstanceOf(
        FormData
      );
    });

    test("should handle transformSendAudioQuery no parseMode", (): void => {
      expect(transformSendAudioQuery(sendAudioQueryNoParseMode)).toBeInstanceOf(
        FormData
      );
    });

    test("should handle transformSendAudioQuery no performer", (): void => {
      expect(transformSendAudioQuery(sendAudioQueryNoPerformer)).toBeInstanceOf(
        FormData
      );
    });

    test("should handle transformSendAudioQuery no replyMarkup", (): void => {
      expect(
        transformSendAudioQuery(sendAudioQueryNoReplyMarkup)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendAudioQuery no replyToMessageId", (): void => {
      expect(
        transformSendAudioQuery(sendAudioQueryNoReplyToMessageId)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendAudioQuery no thumb", (): void => {
      expect(transformSendAudioQuery(sendAudioQueryNoThumb)).toBeInstanceOf(
        FormData
      );
    });

    test("should handle transformSendAudioQuery no title", (): void => {
      expect(transformSendAudioQuery(sendAudioQueryNoTitle)).toBeInstanceOf(
        FormData
      );
    });

    test("should handle transformSendAudioQuery", (): void => {
      expect(transformSendAudioQuery(sendAudioQuery)).toBeInstanceOf(FormData);
    });
  });

  describe("transformSendDocumentQuery", (): void => {
    const sendDocumentQuery: IStateSendDocumentQuery = {
      caption: "",
      chat_id: 0,
      disable_notification: true,
      document: "",
      parse_mode: "HTML",
      reply_markup: {
        force_reply: true
      },
      reply_to_message_id: 0,
      thumb: ""
    };
    const sendDocumentQueryNoCaption: IStateSendDocumentQuery = {
      ...sendDocumentQuery,
      caption: undefined
    };
    const sendDocumentQueryNoDisableNotification: IStateSendDocumentQuery = {
      ...sendDocumentQuery,
      disable_notification: undefined
    };
    const sendDocumentQueryNoParseMode: IStateSendDocumentQuery = {
      ...sendDocumentQuery,
      parse_mode: undefined
    };
    const sendDocumentQueryNoReplyMarkup: IStateSendDocumentQuery = {
      ...sendDocumentQuery,
      reply_markup: undefined
    };
    const sendDocumentQueryNoReplyToMessageId: IStateSendDocumentQuery = {
      ...sendDocumentQuery,
      reply_to_message_id: undefined
    };
    const sendDocumentQueryNoThumb: IStateSendDocumentQuery = {
      ...sendDocumentQuery,
      thumb: undefined
    };

    test("should handle transformSendDocumentQuery no caption", (): void => {
      expect(
        transformSendDocumentQuery(sendDocumentQueryNoCaption)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendDocumentQuery no disableNotification", (): void => {
      expect(
        transformSendDocumentQuery(sendDocumentQueryNoDisableNotification)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendDocumentQuery no parseMode", (): void => {
      expect(
        transformSendDocumentQuery(sendDocumentQueryNoParseMode)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendDocumentQuery no replyMarkup", (): void => {
      expect(
        transformSendDocumentQuery(sendDocumentQueryNoReplyMarkup)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendDocumentQuery no replyToMessageId", (): void => {
      expect(
        transformSendDocumentQuery(sendDocumentQueryNoReplyToMessageId)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendDocumentQuery no thumb", (): void => {
      expect(
        transformSendDocumentQuery(sendDocumentQueryNoThumb)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendDocumentQuery", (): void => {
      expect(transformSendDocumentQuery(sendDocumentQuery)).toBeInstanceOf(
        FormData
      );
    });
  });

  describe("transformSendMediaGroupQuery", (): void => {
    const sendMediaGroupQuery: IStateSendMediaGroupQuery = {
      chat_id: 0,
      disable_notification: true,
      media: [
        {
          caption: "",
          media: "",
          parse_mode: "HTML",
          type: ""
        }
      ],
      reply_to_message_id: 0
    };
    const sendMediaGroupQueryNoDisableNotification: IStateSendMediaGroupQuery = {
      ...sendMediaGroupQuery,
      disable_notification: undefined
    };
    const sendMediaGroupQueryNoReplyToMessageId: IStateSendMediaGroupQuery = {
      ...sendMediaGroupQuery,
      reply_to_message_id: undefined
    };

    test("should handle transformSendMediaGroupQuery no disableNotification", (): void => {
      expect(
        transformSendMediaGroupQuery(sendMediaGroupQueryNoDisableNotification)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendMediaGroupQuery no replyToMessageId", (): void => {
      expect(
        transformSendMediaGroupQuery(sendMediaGroupQueryNoReplyToMessageId)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendMediaGroupQuery", (): void => {
      expect(transformSendMediaGroupQuery(sendMediaGroupQuery)).toBeInstanceOf(
        FormData
      );
    });
  });

  describe("transformSendStickerQuery", (): void => {
    const sendStickerQuery: IStateSendStickerQuery = {
      chat_id: 0,
      disable_notification: true,
      reply_markup: {
        force_reply: true
      },
      reply_to_message_id: 0,
      sticker: ""
    };
    const sendStickerQueryNoDisableNotification: IStateSendStickerQuery = {
      ...sendStickerQuery,
      disable_notification: undefined
    };
    const sendStickerQueryNoReplyMarkup: IStateSendStickerQuery = {
      ...sendStickerQuery,
      reply_markup: undefined
    };
    const sendStickerQueryNoReplyToMessageId: IStateSendStickerQuery = {
      ...sendStickerQuery,
      reply_to_message_id: undefined
    };

    test("should handle transformSendStickerQuery no disableNotification", (): void => {
      expect(
        transformSendStickerQuery(sendStickerQueryNoDisableNotification)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendStickerQuery", (): void => {
      expect(
        transformSendStickerQuery(sendStickerQueryNoReplyMarkup)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendStickerQuery no replyToMessageId", (): void => {
      expect(
        transformSendStickerQuery(sendStickerQueryNoReplyToMessageId)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendStickerQuery", (): void => {
      expect(transformSendStickerQuery(sendStickerQuery)).toBeInstanceOf(
        FormData
      );
    });
  });

  describe("transformSendVideoNoteQuery", (): void => {
    const sendVideoNoteQuery: IStateSendVideoNoteQuery = {
      chat_id: 0,
      disable_notification: true,
      duration: 0,
      length: 0,
      reply_markup: {
        force_reply: true
      },
      reply_to_message_id: 0,
      thumb: "",
      video_note: ""
    };
    const sendVideoNoteQueryNoDisableNotification: IStateSendVideoNoteQuery = {
      ...sendVideoNoteQuery,
      disable_notification: undefined
    };
    const sendVideoNoteQueryNoDuration: IStateSendVideoNoteQuery = {
      ...sendVideoNoteQuery,
      duration: undefined
    };
    const sendVideoNoteQueryNoLength: IStateSendVideoNoteQuery = {
      ...sendVideoNoteQuery,
      length: undefined
    };
    const sendVideoNoteQueryNoReplyMarkup: IStateSendVideoNoteQuery = {
      ...sendVideoNoteQuery,
      reply_markup: undefined
    };
    const sendVideoNoteQueryNoReplyToMessageId: IStateSendVideoNoteQuery = {
      ...sendVideoNoteQuery,
      reply_to_message_id: undefined
    };
    const sendVideoNoteQueryNoThumb: IStateSendVideoNoteQuery = {
      ...sendVideoNoteQuery,
      thumb: undefined
    };

    test("should handle transformSendVideoNoteQuery no disableNotification", (): void => {
      expect(
        transformSendVideoNoteQuery(sendVideoNoteQueryNoDisableNotification)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendVideoNoteQuery no duration", (): void => {
      expect(
        transformSendVideoNoteQuery(sendVideoNoteQueryNoDuration)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendVideoNoteQuery no length", (): void => {
      expect(
        transformSendVideoNoteQuery(sendVideoNoteQueryNoLength)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendVideoNoteQuery no replyMarkup", (): void => {
      expect(
        transformSendVideoNoteQuery(sendVideoNoteQueryNoReplyMarkup)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendVideoNoteQuery no replyToMessageId", (): void => {
      expect(
        transformSendVideoNoteQuery(sendVideoNoteQueryNoReplyToMessageId)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendVideoNoteQuery no thumb", (): void => {
      expect(
        transformSendVideoNoteQuery(sendVideoNoteQueryNoThumb)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendVideoNoteQuery", (): void => {
      expect(transformSendVideoNoteQuery(sendVideoNoteQuery)).toBeInstanceOf(
        FormData
      );
    });
  });

  describe("transformSendAudioQuery", (): void => {
    const sendVideoQuery: IStateSendVideoQuery = {
      caption: "",
      chat_id: 0,
      disable_notification: true,
      duration: 0,
      height: 0,
      parse_mode: "HTML",
      reply_markup: {
        force_reply: true
      },
      reply_to_message_id: 0,
      supports_streaming: true,
      thumb: "",
      video: "",
      width: 0
    };
    const sendVideoQueryNoCaption: IStateSendVideoQuery = {
      ...sendVideoQuery,
      caption: undefined
    };
    const sendVideoQueryNoDisableNotification: IStateSendVideoQuery = {
      ...sendVideoQuery,
      disable_notification: undefined
    };
    const sendVideoQueryNoDuration: IStateSendVideoQuery = {
      ...sendVideoQuery,
      duration: undefined
    };
    const sendVideoQueryNoParseMode: IStateSendVideoQuery = {
      ...sendVideoQuery,
      parse_mode: undefined
    };
    const sendVideoQueryNoHeight: IStateSendVideoQuery = {
      ...sendVideoQuery,
      height: undefined
    };
    const sendVideoQueryNoReplyMarkup: IStateSendVideoQuery = {
      ...sendVideoQuery,
      reply_markup: undefined
    };
    const sendVideoQueryNoReplyToMessageId: IStateSendVideoQuery = {
      ...sendVideoQuery,
      reply_to_message_id: undefined
    };
    const sendVideoQueryNoSupportsStreaming: IStateSendVideoQuery = {
      ...sendVideoQuery,
      supports_streaming: undefined
    };
    const sendVideoQueryNoThumb: IStateSendVideoQuery = {
      ...sendVideoQuery,
      thumb: undefined
    };
    const sendVideoQueryNoWidth: IStateSendVideoQuery = {
      ...sendVideoQuery,
      width: undefined
    };

    test("should handle transformSendVideoQuery no caption", (): void => {
      expect(transformSendVideoQuery(sendVideoQueryNoCaption)).toBeInstanceOf(
        FormData
      );
    });

    test("should handle transformSendVideoQuery no disableNotification", (): void => {
      expect(
        transformSendVideoQuery(sendVideoQueryNoDisableNotification)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendVideoQuery no duration", (): void => {
      expect(transformSendVideoQuery(sendVideoQueryNoDuration)).toBeInstanceOf(
        FormData
      );
    });

    test("should handle transformSendVideoQuery no parseMode", (): void => {
      expect(transformSendVideoQuery(sendVideoQueryNoParseMode)).toBeInstanceOf(
        FormData
      );
    });

    test("should handle transformSendVideoQuery no height", (): void => {
      expect(transformSendVideoQuery(sendVideoQueryNoHeight)).toBeInstanceOf(
        FormData
      );
    });

    test("should handle transformSendVideoQuery no replyMarkup", (): void => {
      expect(
        transformSendVideoQuery(sendVideoQueryNoReplyMarkup)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendVideoQuery no replyToMessageId", (): void => {
      expect(
        transformSendVideoQuery(sendVideoQueryNoReplyToMessageId)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendVideoQuery no supportsStreaming", (): void => {
      expect(
        transformSendVideoQuery(sendVideoQueryNoSupportsStreaming)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendVideoQuery no thumb", (): void => {
      expect(transformSendVideoQuery(sendVideoQueryNoThumb)).toBeInstanceOf(
        FormData
      );
    });

    test("should handle transformSendVideoQuery no width", (): void => {
      expect(transformSendVideoQuery(sendVideoQueryNoWidth)).toBeInstanceOf(
        FormData
      );
    });

    test("should handle transformSendVideoQuery", (): void => {
      expect(transformSendVideoQuery(sendVideoQuery)).toBeInstanceOf(FormData);
    });
  });

  describe("transformSendVoiceQuery", (): void => {
    const sendVoiceQuery: IStateSendVoiceQuery = {
      caption: "",
      chat_id: 0,
      disable_notification: true,
      duration: 0,
      parse_mode: "HTML",
      reply_markup: {
        force_reply: true
      },
      reply_to_message_id: 0,
      voice: ""
    };
    const sendVoiceQueryNoCaption: IStateSendVoiceQuery = {
      ...sendVoiceQuery,
      caption: undefined
    };
    const sendVoiceQueryNoDisableNotification: IStateSendVoiceQuery = {
      ...sendVoiceQuery,
      disable_notification: undefined
    };
    const sendVoiceQueryNoDuration: IStateSendVoiceQuery = {
      ...sendVoiceQuery,
      duration: undefined
    };
    const sendVoiceQueryNoParseMode: IStateSendVoiceQuery = {
      ...sendVoiceQuery,
      parse_mode: undefined
    };
    const sendVoiceQueryNoReplyMarkup: IStateSendVoiceQuery = {
      ...sendVoiceQuery,
      reply_markup: undefined
    };
    const sendVoiceQueryNoReplyToMessageId: IStateSendVoiceQuery = {
      ...sendVoiceQuery,
      reply_to_message_id: undefined
    };

    test("should handle transformSendVoiceQuery no caption", (): void => {
      expect(transformSendVoiceQuery(sendVoiceQueryNoCaption)).toBeInstanceOf(
        FormData
      );
    });

    test("should handle transformSendVoiceQuery no disableNotification", (): void => {
      expect(
        transformSendVoiceQuery(sendVoiceQueryNoDisableNotification)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendVoiceQuery no duration", (): void => {
      expect(transformSendVoiceQuery(sendVoiceQueryNoDuration)).toBeInstanceOf(
        FormData
      );
    });

    test("should handle transformSendVoiceQuery no parseMode", (): void => {
      expect(transformSendVoiceQuery(sendVoiceQueryNoParseMode)).toBeInstanceOf(
        FormData
      );
    });

    test("should handle transformSendVoiceQuery no replyMarkup", (): void => {
      expect(
        transformSendVoiceQuery(sendVoiceQueryNoReplyMarkup)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendVoiceQuery no replyToMessageId", (): void => {
      expect(
        transformSendVoiceQuery(sendVoiceQueryNoReplyToMessageId)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendVoiceQuery", (): void => {
      expect(transformSendVoiceQuery(sendVoiceQuery)).toBeInstanceOf(FormData);
    });
  });

  describe("transformSendPhotoQuery", (): void => {
    const sendPhotoQuery: IStateSendPhotoQuery = {
      caption: "",
      chat_id: 0,
      disable_notification: true,
      parse_mode: "HTML",
      photo: "",
      reply_markup: {
        force_reply: true
      },
      reply_to_message_id: 0
    };
    const sendPhotoQueryNoCaption: IStateSendPhotoQuery = {
      ...sendPhotoQuery,
      caption: undefined
    };
    const sendPhotoQueryNoDisableNotification: IStateSendPhotoQuery = {
      ...sendPhotoQuery,
      disable_notification: undefined
    };
    const sendPhotoQueryNoParseMode: IStateSendPhotoQuery = {
      ...sendPhotoQuery,
      parse_mode: undefined
    };
    const sendPhotoQueryNoReplyMarkup: IStateSendPhotoQuery = {
      ...sendPhotoQuery,
      reply_markup: undefined
    };
    const sendPhotoQueryNoReplyToMessageId: IStateSendPhotoQuery = {
      ...sendPhotoQuery,
      reply_to_message_id: undefined
    };

    test("should handle transformSendPhotoQuery no caption", (): void => {
      expect(transformSendPhotoQuery(sendPhotoQueryNoCaption)).toBeInstanceOf(
        FormData
      );
    });

    test("should handle transformSendPhotoQuery no disableNotification", (): void => {
      expect(
        transformSendPhotoQuery(sendPhotoQueryNoDisableNotification)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendPhotoQuery no parseMode", (): void => {
      expect(transformSendPhotoQuery(sendPhotoQueryNoParseMode)).toBeInstanceOf(
        FormData
      );
    });

    test("should handle transformSendPhotoQuery no replyMarkup", (): void => {
      expect(
        transformSendPhotoQuery(sendPhotoQueryNoReplyMarkup)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendPhotoQuery no replyToMessageId", (): void => {
      expect(
        transformSendPhotoQuery(sendPhotoQueryNoReplyToMessageId)
      ).toBeInstanceOf(FormData);
    });

    test("should handle transformSendPhotoQuery", (): void => {
      expect(transformSendPhotoQuery(sendPhotoQuery)).toBeInstanceOf(FormData);
    });
  });
});
