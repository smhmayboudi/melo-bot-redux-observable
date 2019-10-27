import { findByCode } from "./emojis";

const actionAddStickerToSetQueryUndefined: string =
  "actionAddStickerToSetQuery undefined.";
const actionAnswerCallbackQueryQueryUndefined: string =
  "actionAnswerCallbackQueryQuery undefined.";
const actionAnswerInlineQueryQueryUndefined: string =
  "actionAnswerInlineQueryQuery undefined.";
const actionAnswerPreCheckoutQueryQueryUndefined: string =
  "actionAnswerPreCheckoutQueryQuery undefined.";
const actionAnswerShippingQueryQueryUndefined: string =
  "actionAnswerShippingQueryQuery undefined.";
const actionChosenInlineResultQueryUndefined: string =
  "actionChosenInlineResultQuery undefined.";
const actionCreateNewStickerSetQueryUndefined: string =
  "actionCreateNewStickerSetQuery undefined.";
const actionDeleteChatPhotoQueryUndefined: string =
  "actionDeleteChatPhotoQuery undefined.";
const actionDeleteChatStickerSetQueryUndefined: string =
  "actionDeleteChatStickerSetQuery undefined.";
const actionDeleteMessageQueryUndefined: string =
  "actionDeleteMessageQuery undefined.";
const actionDeleteStickerFromSetQueryUndefined: string =
  "actionDeleteStickerFromSetQuery undefined.";
const actionDeleteWebhookQueryUndefined: string =
  "actionDeleteWebhookQueryUndefined undefined.";
const actionEditMessageCaptionQueryUndefined: string =
  "actionEditMessageCaptionQuery undefined.";
const actionEditMessageLiveLocationQueryUndefined: string =
  "actionEditMessageLiveLocationQuery undefined.";
const actionEditMessageMediaQueryUndefined: string =
  "actionEditMessageMediaQuery undefined.";
const actionEditMessageReplyMarkupQueryUndefined: string =
  "actionEditMessageReplyMarkupQuery undefined.";
const actionEditMessageTextQueryUndefined: string =
  "actionEditMessageTextQuery undefined.";
const actionExportChatInviteLinkQueryUndefined: string =
  "actionExportChatInviteLinkQuery undefined.";
const actionForwardMessageQueryUndefined: string =
  "actionForwardMessageQuery undefined.";
const actionGetChatAdministratorsQueryUndefined: string =
  "actionGetChatAdministratorsQuery undefined.";
const actionGetChatMemberQueryUndefined: string =
  "actionGetChatMemberQuery undefined.";
const actionGetChatMembersCountQueryUndefined: string =
  "actionGetChatMembersCountQuery undefined.";
const actionGetChatQueryUndefined: string = "actionGetChatQuery undefined.";
const actionGetFileQueryUndefined: string = "actionGetFileQuery undefined.";
const actionGetGameHighScoresQueryUndefined: string =
  "actionGetGameHighScoresQuery undefined.";
const actionGetMeQueryUndefined: string = "actionGetMeQuery undefined.";
const actionGetStickerSetQueryUndefined: string =
  "actionGetStickerSetQuery undefined.";
const actionGetUpdatesQueryUndefined: string =
  "actionGetUpdatesQuery undefined.";
const actionGetUserProfilePhotosQueryUndefined: string =
  "actionGetUserProfilePhotosQuery undefined.";
const actionGetWebhookInfoQueryUndefined: string =
  "actionGetWebhookInfoQuery undefined.";
const actionInlineQueryQueryUndefined: string =
  "actionInlineQueryQuery undefined.";
const actionKickChatMemberQueryUndefined: string =
  "actionKickChatMemberQuery undefined.";
const actionLeaveChatQueryUndefined: string = "actionLeaveChatQuery undefined.";
const actionPinChatMessageQueryUndefined: string =
  "actionPinChatMessageQuery undefined.";
const actionPromoteChatMemberQueryUndefined: string =
  "actionPromoteChatMemberQuery undefined.";
const actionRestrictChatMemberQueryUndefined: string =
  "actionRestrictChatMemberQuery undefined.";
const actionSendAnimationQueryUndefined: string =
  "actionSendAnimationQuery undefined.";
const actionSendAudioQueryUndefined: string = "actionSendAudioQuery undefined.";
const actionSendChatActionQueryUndefined: string =
  "actionSendChatActionQuery undefined.";
const actionSendContactQueryUndefined: string =
  "actionSendContactQuery undefined.";
const actionSendDocumentQueryUndefined: string =
  "actionSendDocumentQuery undefined.";
const actionSendGameQueryUndefined: string = "actionSendGameQuery undefined.";
const actionSendInvoiceQueryUndefined: string =
  "actionSendInvoiceQuery undefined.";
const actionSendLocationQueryUndefined: string =
  "actionSendLocationQuery undefined.";
const actionSendMediaGroupQueryUndefined: string =
  "actionSendMediaGroupQuery undefined.";
const actionSendMessageQueryUndefined: string =
  "actionSendMessageQuery undefined.";
const actionSendPhotoQueryUndefined: string = "actionSendPhotoQuery undefined.";
const actionSendPollQueryUndefined: string = "actionSendPollQuery undefined.";
const actionSendStickerQueryUndefined: string =
  "actionSendStickerQuery undefined.";
const actionSendVenueQueryUndefined: string = "actionSendVenueQuery undefined.";
const actionSendVideoNoteQueryUndefined: string =
  "actionSendVideoNoteQuery undefined.";
const actionSendVideoQueryUndefined: string = "actionSendVideoQuery undefined.";
const actionSendVideoResultCaptionUndefined: string =
  "actionSendVideoResultCaption undefined.";
const actionSendVideoResultReplyToMessageTextUndefined: string =
  "actionSendVideoResultReplyToMessageText undefined.";
const actionSendVideoResultReplyToMessageUndefined: string =
  "actionSendVideoResultReplyToMessage undefined.";
const actionSendVideoResultUndefined: string =
  "actionSendVideoResult undefined.";
const actionSendVoiceQueryUndefined: string = "actionSendVoiceQuery undefined.";
const actionSetChatDescriptionQueryUndefined: string =
  "actionSetChatDescriptionQuery undefined.";
const actionSetChatPhotoQueryUndefined: string =
  "actionSetChatPhotoQuery undefined.";
const actionSetChatStickerSetQueryUndefined: string =
  "actionSetChatStickerSetQuery undefined.";
const actionSetChatTitleQueryUndefined: string =
  "actionSetChatTitleQuery undefined.";
const actionSetGameScoreQueryUndefined: string =
  "actionSetGameScoreQuery undefined.";
const actionSetPassportDataErrorsQueryUndefined: string =
  "actionSetPassportDataErrorsQuery undefined.";
const actionSetStickerPositionInSetQueryUndefined: string =
  "actionSetStickerPositionInSetQuery undefined.";
const actionSetWebhookQueryUndefined: string =
  "actionSetWebhookQuery undefined.";
const actionStopMessageLiveLocationQueryUndefined: string =
  "actionStopMessageLiveLocationQuery undefined.";
const actionStopPollQueryUndefined: string = "actionStopPollQuery undefined.";
const actionUnbanChatMemberQueryUndefined: string =
  "actionUnbanChatMemberQuery undefined.";
const actionUnpinChatMessageQueryUndefined: string =
  "actionUnpinChatMessageQuery undefined.";
const actionUploadStickerFileQueryUndefined: string =
  "actionUploadStickerFileQuery undefined.";
const actionYoutubeDownloadQueryUndefined: string =
  "actionYoutubeDownloadQuery undefined.";
const actionYoutubeDownloadResultUndefined: string =
  "actionYoutubeDownloadResult undefined.";
const actionYoutubeSearchListQueryUndefined: string =
  "actionYoutubeSearchListQuery undefined.";
const actionYoutubeSearchListResultItemsUndefined: string =
  "actionYoutubeSearchListResultItems undefined.";
const actionYoutubeSearchListResultUndefined: string =
  "actionYoutubeSearchListResult undefined.";
const actionYoutubeVideoListQueryUndefined: string =
  "actionYoutubeVideoListQuery undefined.";
const actionYoutubeVideoListResultItemsUndefined: string =
  "actionYoutubeVideoListResultItems undefined.";
const actionYoutubeVideoListResultUndefined: string =
  "actionYoutubeVideoListResult undefined.";
const commandDownload: string = "dl";
const commandMostPopular: string = "mp";
const commandRelatedToVideoId: string = "rl";
const commandSeparator: string = "_";
const commandStart: string = "start";
const epicDependencyBotTokenUndefined: string =
  "epicDependencyBotToken undefined.";
const epicDependencyCollectionObservableUndefined: string =
  "collectionObservable undefined.";
const epicDependencyFindOneObservableUndefined: string =
  "findOneObservable undefined.";
const epicDependencyInsertOneObservableUndefined: string =
  "insertOneObservable undefined.";
const epicDependencyMongoClientObservableObservableUndefined: string =
  "epicDependencyMongoClientObservable undefined.";
const epicDependencyRequestObservableUndefined: string =
  "epicDependencyRequestObservable undefined.";
const epicDependencyRequestUploadObservableUndefined: string =
  "epicDependencyRequestUploadObservable undefined.";
const epicDependencyRequestsObservableUndefined: string =
  "epicDependencyRequestsObservable undefined.";
const epicDependencyRequestsUploadObservableUndefined: string =
  "epicDependencyRequestsUploadObservable undefined.";
const epicDependencyYoutubeDownloadObservableUndefined: string =
  "epicDependencyYoutubeDownloadObservable undefined.";
const epicInlineQueryConnectGoogleAccount: string =
  "Connect your Google account";
const epicYoutubeFindOneObservableDownloadValueMimeTypeUndefined: string =
  "epicYoutubeFindOneObservableDownloadValueMimeType undefined.";
const epicYoutubeFindOneObservableDownloadValueThumbUndefined: string =
  "epicYoutubeFindOneObservableDownloadValueThumb undefined.";
const messageAdvertisementChannel: string = `${
  findByCode("1F194").char
} melobit`;
const messageAdvertisementChannelJoinLink: string =
  "https://t.me/joinchat/AAAAADu2QGw8mAt1RjY3nw";
const messageChannel: string = `${findByCode("1F194").char} melodio`;
const messageChannelJoinLink: string =
  "https://t.me/joinchat/AAAAAEPogeZYp43PUvrfyA";
const messageError: string = `SYSTEM ERROR, PLEASE TRY AGAIN. ${
  findByCode("1F915").char
}`;
const messageJoin: string = `FOR SUPPORT OUR WORKS PLEASE JOIN OUR CHANNEL.\n\n${
  findByCode("1F449").char
} ${messageChannelJoinLink} ${findByCode("1F448").char}`;
const messageNoResult: string = "NO RESULT";
const messageResultQ: (q: string) => string = (q: string): string =>
  `${findByCode("1F50E").char} RESULT(S) FOR ${q} QUERY`;
const messageResultRelatedTo: string = `${
  findByCode("1F50E").char
} RELATED RESULT(S)`;
const messageSeparator: string = "--------------------";
const messageStart: string = `WELCOME ${findByCode("1F917").char}`;
const state$Undefined: string = "state$ undefined.";
const state$ValueGetChatMemberQueryUndefined: string =
  "state$ValueGetChatMemberQuery undefined.";
const state$ValueInlineQueryQueryUndefined: string =
  "state$ValueInlineQueryQuery undefined.";
const state$ValueMessageQueryMessageUndefined: string =
  "state$ValueMessageQueryMessage undefined.";
const state$ValueMessageQueryUndefined: string =
  "state$ValueMessageQuery undefined.";
const state$ValueYoutubeSearchListQueryQUndefined: string =
  "state$ValueYoutubeSearchListQueryQ undefined.";
const state$ValueYoutubeSearchListQueryUndefined: string =
  "state$ValueYoutubeSearchListQuery undefined.";
const state$ValueYoutubeVideoListQueryQUndefined: string =
  "state$ValueYoutubeVideoListQueryQ undefined.";

export {
  actionAddStickerToSetQueryUndefined,
  actionAnswerCallbackQueryQueryUndefined,
  actionAnswerInlineQueryQueryUndefined,
  actionAnswerPreCheckoutQueryQueryUndefined,
  actionAnswerShippingQueryQueryUndefined,
  actionChosenInlineResultQueryUndefined,
  actionCreateNewStickerSetQueryUndefined,
  actionDeleteChatPhotoQueryUndefined,
  actionDeleteChatStickerSetQueryUndefined,
  actionDeleteMessageQueryUndefined,
  actionDeleteStickerFromSetQueryUndefined,
  actionDeleteWebhookQueryUndefined,
  actionEditMessageCaptionQueryUndefined,
  actionEditMessageLiveLocationQueryUndefined,
  actionEditMessageMediaQueryUndefined,
  actionEditMessageReplyMarkupQueryUndefined,
  actionEditMessageTextQueryUndefined,
  actionExportChatInviteLinkQueryUndefined,
  actionForwardMessageQueryUndefined,
  actionGetChatAdministratorsQueryUndefined,
  actionGetChatMemberQueryUndefined,
  actionGetChatMembersCountQueryUndefined,
  actionGetChatQueryUndefined,
  actionGetFileQueryUndefined,
  actionGetGameHighScoresQueryUndefined,
  actionGetMeQueryUndefined,
  actionGetStickerSetQueryUndefined,
  actionGetUpdatesQueryUndefined,
  actionGetUserProfilePhotosQueryUndefined,
  actionGetWebhookInfoQueryUndefined,
  actionInlineQueryQueryUndefined,
  actionKickChatMemberQueryUndefined,
  actionLeaveChatQueryUndefined,
  actionPinChatMessageQueryUndefined,
  actionPromoteChatMemberQueryUndefined,
  actionRestrictChatMemberQueryUndefined,
  actionSendAnimationQueryUndefined,
  actionSendAudioQueryUndefined,
  actionSendChatActionQueryUndefined,
  actionSendContactQueryUndefined,
  actionSendDocumentQueryUndefined,
  actionSendGameQueryUndefined,
  actionSendInvoiceQueryUndefined,
  actionSendLocationQueryUndefined,
  actionSendMediaGroupQueryUndefined,
  actionSendMessageQueryUndefined,
  actionSendPhotoQueryUndefined,
  actionSendPollQueryUndefined,
  actionSendStickerQueryUndefined,
  actionSendVenueQueryUndefined,
  actionSendVideoNoteQueryUndefined,
  actionSendVideoQueryUndefined,
  actionSendVideoResultCaptionUndefined,
  actionSendVideoResultReplyToMessageTextUndefined,
  actionSendVideoResultReplyToMessageUndefined,
  actionSendVideoResultUndefined,
  actionSendVoiceQueryUndefined,
  actionSetChatDescriptionQueryUndefined,
  actionSetChatPhotoQueryUndefined,
  actionSetChatStickerSetQueryUndefined,
  actionSetChatTitleQueryUndefined,
  actionSetGameScoreQueryUndefined,
  actionSetPassportDataErrorsQueryUndefined,
  actionSetStickerPositionInSetQueryUndefined,
  actionSetWebhookQueryUndefined,
  actionStopMessageLiveLocationQueryUndefined,
  actionStopPollQueryUndefined,
  actionUnbanChatMemberQueryUndefined,
  actionUnpinChatMessageQueryUndefined,
  actionUploadStickerFileQueryUndefined,
  actionYoutubeDownloadQueryUndefined,
  actionYoutubeDownloadResultUndefined,
  actionYoutubeSearchListQueryUndefined,
  actionYoutubeSearchListResultItemsUndefined,
  actionYoutubeSearchListResultUndefined,
  actionYoutubeVideoListQueryUndefined,
  actionYoutubeVideoListResultItemsUndefined,
  actionYoutubeVideoListResultUndefined,
  commandDownload,
  commandMostPopular,
  commandRelatedToVideoId,
  commandSeparator,
  commandStart,
  epicDependencyBotTokenUndefined,
  epicDependencyCollectionObservableUndefined,
  epicDependencyFindOneObservableUndefined,
  epicDependencyInsertOneObservableUndefined,
  epicDependencyMongoClientObservableObservableUndefined,
  epicDependencyRequestObservableUndefined,
  epicDependencyRequestsObservableUndefined,
  epicDependencyRequestsUploadObservableUndefined,
  epicDependencyRequestUploadObservableUndefined,
  epicDependencyYoutubeDownloadObservableUndefined,
  epicInlineQueryConnectGoogleAccount,
  epicYoutubeFindOneObservableDownloadValueMimeTypeUndefined,
  epicYoutubeFindOneObservableDownloadValueThumbUndefined,
  messageAdvertisementChannel,
  messageAdvertisementChannelJoinLink,
  messageChannel,
  messageChannelJoinLink,
  messageError,
  messageJoin,
  messageNoResult,
  messageResultQ,
  messageResultRelatedTo,
  messageSeparator,
  messageStart,
  state$Undefined,
  state$ValueGetChatMemberQueryUndefined,
  state$ValueInlineQueryQueryUndefined,
  state$ValueMessageQueryMessageUndefined,
  state$ValueMessageQueryUndefined,
  state$ValueYoutubeSearchListQueryQUndefined,
  state$ValueYoutubeSearchListQueryUndefined,
  state$ValueYoutubeVideoListQueryQUndefined
};
