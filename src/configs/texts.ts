import { findByCode } from "./emojis";

const actionAnswerCallbackQueryQueryUndefined: string =
  "actionAnswerCallbackQueryQuery undefined.";
const actionAnswerInlineQueryQueryUndefined: string =
  "actionAnswerInlineQueryQuery undefined.";
const actionChosenInlineResultQueryUndefined: string =
  "actionChosenInlineResultQuery undefined.";
const actionGetChatMemberQueryUndefined: string =
  "actionGetChatMemberQuery undefined.";
const actionGetUpdatesQueryUndefined: string =
  "actionGetUpdatesQuery undefined.";
const actionInlineQueryQueryUndefined: string =
  "actionInlineQueryQuery undefined.";
const actionSendAudioQueryUndefined: string = "actionSendAudioQuery undefined.";
const actionSendMessageQueryUndefined: string =
  "actionSendMessageQuery undefined.";
const actionSendVideoQueryUndefined: string = "actionSendVideoQuery undefined.";
const actionSendVideoResultCaptionUndefined: string =
  "actionSendVideoResultCaption undefined.";
const actionSendVideoResultReplyToMessageTextUndefined: string =
  "actionSendVideoResultReplyToMessageText undefined.";
const actionSendVideoResultReplyToMessageUndefined: string =
  "actionSendVideoResultReplyToMessage undefined.";
const actionSendVideoResultUndefined: string =
  "actionSendVideoResult undefined.";
const actionSetWebhookQueryUndefined: string =
  "actionSetWebhookQuery undefined.";
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
  actionAnswerCallbackQueryQueryUndefined,
  actionAnswerInlineQueryQueryUndefined,
  actionChosenInlineResultQueryUndefined,
  actionGetChatMemberQueryUndefined,
  actionGetUpdatesQueryUndefined,
  actionInlineQueryQueryUndefined,
  actionSendAudioQueryUndefined,
  actionSendMessageQueryUndefined,
  actionSendVideoQueryUndefined,
  actionSendVideoResultCaptionUndefined,
  actionSendVideoResultReplyToMessageTextUndefined,
  actionSendVideoResultReplyToMessageUndefined,
  actionSendVideoResultUndefined,
  actionSetWebhookQueryUndefined,
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
