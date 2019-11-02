import { findByCode } from "./emojis";

const actionAddStickerToSetQueryUndefined =
  "actionAddStickerToSetQuery undefined.";
const actionAnswerCallbackQueryQueryUndefined =
  "actionAnswerCallbackQueryQuery undefined.";
const actionAnswerInlineQueryQuerySwitchPMText = "Connect your Google account";
const actionAnswerInlineQueryQueryUndefined =
  "actionAnswerInlineQueryQuery undefined.";
const actionAnswerPreCheckoutQueryQueryUndefined =
  "actionAnswerPreCheckoutQueryQuery undefined.";
const actionAnswerShippingQueryQueryUndefined =
  "actionAnswerShippingQueryQuery undefined.";
const actionChosenInlineResultQueryUndefined =
  "actionChosenInlineResultQuery undefined.";
const actionCreateNewStickerSetQueryUndefined =
  "actionCreateNewStickerSetQuery undefined.";
const actionDeleteChatPhotoQueryUndefined =
  "actionDeleteChatPhotoQuery undefined.";
const actionDeleteChatStickerSetQueryUndefined =
  "actionDeleteChatStickerSetQuery undefined.";
const actionDeleteMessageQueryUndefined = "actionDeleteMessageQuery undefined.";
const actionDeleteStickerFromSetQueryUndefined =
  "actionDeleteStickerFromSetQuery undefined.";
const actionDeleteWebhookQueryUndefined =
  "actionDeleteWebhookQueryUndefined undefined.";
const actionEditMessageCaptionQueryUndefined =
  "actionEditMessageCaptionQuery undefined.";
const actionEditMessageLiveLocationQueryUndefined =
  "actionEditMessageLiveLocationQuery undefined.";
const actionEditMessageMediaQueryUndefined =
  "actionEditMessageMediaQuery undefined.";
const actionEditMessageReplyMarkupQueryUndefined =
  "actionEditMessageReplyMarkupQuery undefined.";
const actionEditMessageTextQueryUndefined =
  "actionEditMessageTextQuery undefined.";
const actionExportChatInviteLinkQueryUndefined =
  "actionExportChatInviteLinkQuery undefined.";
const actionForwardMessageQueryUndefined =
  "actionForwardMessageQuery undefined.";
const actionGetChatAdministratorsQueryUndefined =
  "actionGetChatAdministratorsQuery undefined.";
const actionGetChatMemberQueryUndefined = "actionGetChatMemberQuery undefined.";
const actionGetChatMembersCountQueryUndefined =
  "actionGetChatMembersCountQuery undefined.";
const actionGetChatQueryUndefined = "actionGetChatQuery undefined.";
const actionGetFileQueryUndefined = "actionGetFileQuery undefined.";
const actionGetGameHighScoresQueryUndefined =
  "actionGetGameHighScoresQuery undefined.";
const actionGetMeQueryUndefined = "actionGetMeQuery undefined.";
const actionGetStickerSetQueryUndefined = "actionGetStickerSetQuery undefined.";
const actionGetUpdatesQueryUndefined = "actionGetUpdatesQuery undefined.";
const actionGetUserProfilePhotosQueryUndefined =
  "actionGetUserProfilePhotosQuery undefined.";
const actionGetWebhookInfoQueryUndefined =
  "actionGetWebhookInfoQuery undefined.";
const actionInlineQueryQueryUndefined = "actionInlineQueryQuery undefined.";
const actionKickChatMemberQueryUndefined =
  "actionKickChatMemberQuery undefined.";
const actionLeaveChatQueryUndefined = "actionLeaveChatQuery undefined.";
const actionPinChatMessageQueryUndefined =
  "actionPinChatMessageQuery undefined.";
const actionPromoteChatMemberQueryUndefined =
  "actionPromoteChatMemberQuery undefined.";
const actionRestrictChatMemberQueryUndefined =
  "actionRestrictChatMemberQuery undefined.";
const actionSendAnimationQueryUndefined = "actionSendAnimationQuery undefined.";
const actionSendAudioQueryUndefined = "actionSendAudioQuery undefined.";
const actionSendChatActionQueryUndefined =
  "actionSendChatActionQuery undefined.";
const actionSendContactQueryUndefined = "actionSendContactQuery undefined.";
const actionSendDocumentQueryUndefined = "actionSendDocumentQuery undefined.";
const actionSendGameQueryUndefined = "actionSendGameQuery undefined.";
const actionSendInvoiceQueryUndefined = "actionSendInvoiceQuery undefined.";
const actionSendLocationQueryUndefined = "actionSendLocationQuery undefined.";
const actionSendMediaGroupQueryUndefined =
  "actionSendMediaGroupQuery undefined.";
const actionSendMessageQueryUndefined = "actionSendMessageQuery undefined.";
const actionSendPhotoQueryUndefined = "actionSendPhotoQuery undefined.";
const actionSendPollQueryUndefined = "actionSendPollQuery undefined.";
const actionSendStickerQueryUndefined = "actionSendStickerQuery undefined.";
const actionSendVenueQueryUndefined = "actionSendVenueQuery undefined.";
const actionSendVideoNoteQueryUndefined = "actionSendVideoNoteQuery undefined.";
const actionSendVideoQueryUndefined = "actionSendVideoQuery undefined.";
const actionSendVideoResultCaptionUndefined =
  "actionSendVideoResultCaption undefined.";
const actionSendVideoResultReplyToMessageTextUndefined =
  "actionSendVideoResultReplyToMessageText undefined.";
const actionSendVideoResultReplyToMessageUndefined =
  "actionSendVideoResultReplyToMessage undefined.";
const actionSendVideoResultUndefined = "actionSendVideoResult undefined.";
const actionSendVoiceQueryUndefined = "actionSendVoiceQuery undefined.";
const actionSetChatDescriptionQueryUndefined =
  "actionSetChatDescriptionQuery undefined.";
const actionSetChatPhotoQueryUndefined = "actionSetChatPhotoQuery undefined.";
const actionSetChatStickerSetQueryUndefined =
  "actionSetChatStickerSetQuery undefined.";
const actionSetChatTitleQueryUndefined = "actionSetChatTitleQuery undefined.";
const actionSetGameScoreQueryUndefined = "actionSetGameScoreQuery undefined.";
const actionSetPassportDataErrorsQueryUndefined =
  "actionSetPassportDataErrorsQuery undefined.";
const actionSetStickerPositionInSetQueryUndefined =
  "actionSetStickerPositionInSetQuery undefined.";
const actionSetWebhookQueryUndefined = "actionSetWebhookQuery undefined.";
const actionStopMessageLiveLocationQueryUndefined =
  "actionStopMessageLiveLocationQuery undefined.";
const actionStopPollQueryUndefined = "actionStopPollQuery undefined.";
const actionUnbanChatMemberQueryUndefined =
  "actionUnbanChatMemberQuery undefined.";
const actionUnpinChatMessageQueryUndefined =
  "actionUnpinChatMessageQuery undefined.";
const actionUploadStickerFileQueryUndefined =
  "actionUploadStickerFileQuery undefined.";
const actionYoutubeDownloadQueryUndefined =
  "actionYoutubeDownloadQuery undefined.";
const actionYoutubeDownloadResultUndefined =
  "actionYoutubeDownloadResult undefined.";
const actionYoutubeSearchListQueryUndefined =
  "actionYoutubeSearchListQuery undefined.";
const actionYoutubeSearchListResultItemsUndefined =
  "actionYoutubeSearchListResultItems undefined.";
const actionYoutubeSearchListResultUndefined =
  "actionYoutubeSearchListResult undefined.";
const actionYoutubeVideoListQueryUndefined =
  "actionYoutubeVideoListQuery undefined.";
const actionYoutubeVideoListResultItemsUndefined =
  "actionYoutubeVideoListResultItems undefined.";
const actionYoutubeVideoListResultUndefined =
  "actionYoutubeVideoListResult undefined.";
const commandDownload = "dl";
const commandHelp = "help";
const commandMostPopular = "mp";
const commandRelatedToVideoId = "rl";
const commandSeparator = "_";
const commandSetInlineGeo = "setinlinegeo";
const commandSettings = "settings";
const commandStart = "start";
const epicDependencyBotTokenUndefined = "epicDependencyBotToken undefined.";
const epicDependencyCollectionObservableUndefined =
  "collectionObservable undefined.";
const epicDependencyFindOneObservableUndefined = "findOneObservable undefined.";
const epicDependencyInsertOneObservableUndefined =
  "insertOneObservable undefined.";
const epicDependencyMongoClientObservableObservableUndefined =
  "epicDependencyMongoClientObservable undefined.";
const epicDependencyRequestObservableUndefined =
  "epicDependencyRequestObservable undefined.";
const epicDependencyRequestUploadObservableUndefined =
  "epicDependencyRequestUploadObservable undefined.";
const epicDependencyRequestsObservableUndefined =
  "epicDependencyRequestsObservable undefined.";
const epicDependencyRequestsUploadObservableUndefined =
  "epicDependencyRequestsUploadObservable undefined.";
const epicDependencyYoutubeDownloadObservableUndefined =
  "epicDependencyYoutubeDownloadObservable undefined.";
const epicYoutubeDownloadValueMimeTypeUndefined =
  "epicYoutubeFindOneObservableDownloadValueMimeType undefined.";
const epicYoutubeDownloadValueThumbUndefined =
  "epicYoutubeFindOneObservableDownloadValueThumb undefined.";
const messageAdvertisementChannel = `${findByCode("1F194").char} melobit`;
const messageAdvertisementChannelJoinLink =
  "https://t.me/joinchat/AAAAADu2QGw8mAt1RjY3nw";
const messageChannel = `${findByCode("1F194").char} melodio`;
const messageChannelJoinLink = "https://t.me/joinchat/AAAAAEPogeZYp43PUvrfyA";
const messageError = `SYSTEM ERROR, PLEASE TRY AGAIN. ${
  findByCode("1F915").char
}`;
const messageHelp = "HELP";
const messageJoin = `FOR SUPPORT OUR WORKS PLEASE JOIN OUR CHANNEL.\n\n${
  findByCode("1F449").char
} ${messageChannelJoinLink} ${findByCode("1F448").char}`;
const messageNoResult = "NO RESULT";
const messageResultQ: (q: string) => string = (q: string): string =>
  `${findByCode("1F50E").char} QUERY RESULT(S) OF ${q}`;
const messageResultRelatedTo: (chart: string) => string = (
  chart: string
): string => `${findByCode("1F50E").char} RESULT(S) RELATED TO ${chart}`;
const messageSeparator = "--------------------";
const messageSetInlineGeo = "SETINLINEGEO";
const messageSettings = "SETTINGS";
const messageStart = `WELCOME ${findByCode("1F917").char}`;
const messageWithPaginationNext = "NEXT";
const messageWithPaginationPrev = "PREV";
const state$Undefined = "state$ undefined.";
const state$ValueGetChatMemberQueryUndefined =
  "state$ValueGetChatMemberQuery undefined.";
const state$ValueInlineQueryQueryUndefined =
  "state$ValueInlineQueryQuery undefined.";
const state$ValueMessageQueryCallbackQueryUndefined =
  "state$ValueMessageQueryCallbackQuery undefined.";
const state$ValueMessageQueryCallbackQueryMessageUndefined =
  "state$ValueMessageQueryCallbackQueryMessageUndefined undefined.";
const state$ValueMessageQueryMessageUndefined =
  "state$ValueMessageQueryMessage undefined.";
const state$ValueMessageQueryUndefined = "state$ValueMessageQuery undefined.";
const state$ValueYoutubeSearchListQueryQUndefined =
  "state$ValueYoutubeSearchListQueryQ undefined.";
const state$ValueYoutubeSearchListQueryQRelatedToVideoIdUndefined =
  "state$ValueYoutubeSearchListQueryQRelatedToVideoId undefined.";
const state$ValueYoutubeSearchListQueryUndefined =
  "state$ValueYoutubeSearchListQuery undefined.";
const state$ValueYoutubeVideoListQueryQUndefined =
  "state$ValueYoutubeVideoListQueryQ undefined.";
const state$ValueYoutubeVideoListQueryChartUndefined =
  "state$ValueYoutubeVideoListQueryChart undefined.";
const state$ValueYoutubeVideoListQueryUndefined =
  "state$ValueYoutubeVideoListQuery undefined.";

export {
  actionAddStickerToSetQueryUndefined,
  actionAnswerCallbackQueryQueryUndefined,
  actionAnswerInlineQueryQuerySwitchPMText,
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
  commandHelp,
  commandMostPopular,
  commandRelatedToVideoId,
  commandSeparator,
  commandSetInlineGeo,
  commandSettings,
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
  epicYoutubeDownloadValueMimeTypeUndefined,
  epicYoutubeDownloadValueThumbUndefined,
  messageAdvertisementChannel,
  messageAdvertisementChannelJoinLink,
  messageChannel,
  messageChannelJoinLink,
  messageError,
  messageHelp,
  messageJoin,
  messageNoResult,
  messageResultQ,
  messageResultRelatedTo,
  messageSeparator,
  messageSetInlineGeo,
  messageSettings,
  messageStart,
  messageWithPaginationNext,
  messageWithPaginationPrev,
  state$Undefined,
  state$ValueGetChatMemberQueryUndefined,
  state$ValueInlineQueryQueryUndefined,
  state$ValueMessageQueryCallbackQueryUndefined,
  state$ValueMessageQueryCallbackQueryMessageUndefined,
  state$ValueMessageQueryMessageUndefined,
  state$ValueMessageQueryUndefined,
  state$ValueYoutubeSearchListQueryQUndefined,
  state$ValueYoutubeSearchListQueryQRelatedToVideoIdUndefined,
  state$ValueYoutubeSearchListQueryUndefined,
  state$ValueYoutubeVideoListQueryQUndefined,
  state$ValueYoutubeVideoListQueryChartUndefined,
  state$ValueYoutubeVideoListQueryUndefined
};
