import * as icons from "./icons";

const actionGetChatMemberQueryUndefined: string =
  "actionGetChatMemberQuery undefined.";
const actionLiterateQueryUndefined: string = "actionLiterateQuery undefined.";
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
const messageAdvertisementChannel: string = `${icons.identificationSign} melobit`;
const messageAdvertisementChannelJoinLink: string =
  "https://t.me/joinchat/AAAAADu2QGw8mAt1RjY3nw";
const messageChannel: string = `${icons.identificationSign} melodio`;
const messageChannelJoinLink: string =
  "https://t.me/joinchat/AAAAAEPogeZYp43PUvrfyA";
const messageError: string = `SYSTEM ERROR, PLEASE TRY AGAIN. ${icons.faceWithHeadBandage}`;
const messageJoin: string = `FOR SUPPORT OUR WORKS PLEASE JOIN OUR CHANNEL.\n\n${icons.backhandIndexFingerPointingRight} ${messageChannelJoinLink} ${icons.backhandIndexFingerPointingLeft}`;
const messageNoResult: string = "NO RESULT";
const messageResultQ: (q: string) => string = (q: string): string =>
  `${icons.rightPointingMagnifyingGlass} RESULT(S) FOR ${q} QUERY`;
const messageResultRelatedTo: string = `${icons.rightPointingMagnifyingGlass} RELATED RESULT(S)`;
const messageSeparator: string = "--------------------";
const messageStart: string = `WELCOME ${icons.happyFaceWithHuggingHands}`;
const state$Undefined: string = "state$ undefined.";
const state$ValueGetChatMemberQueryUndefined: string =
  "state$ValueGetChatMemberQuery undefined.";
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
const state$ValueYoutubeVideoListQueryUndefined: string =
  "state$ValueYoutubeVideoListQuery undefined.";

export {
  actionGetChatMemberQueryUndefined,
  actionLiterateQueryUndefined,
  actionSendAudioQueryUndefined,
  actionSendMessageQueryUndefined,
  actionSendVideoQueryUndefined,
  actionSendVideoResultCaptionUndefined,
  actionSendVideoResultReplyToMessageTextUndefined,
  actionSendVideoResultReplyToMessageUndefined,
  actionSendVideoResultUndefined,
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
  epicDependencyRequestUploadObservableUndefined,
  epicDependencyRequestsObservableUndefined,
  epicDependencyRequestsUploadObservableUndefined,
  epicDependencyYoutubeDownloadObservableUndefined,
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
  state$ValueMessageQueryMessageUndefined,
  state$ValueMessageQueryUndefined,
  state$ValueYoutubeSearchListQueryQUndefined,
  state$ValueYoutubeSearchListQueryUndefined,
  state$ValueYoutubeVideoListQueryQUndefined,
  state$ValueYoutubeVideoListQueryUndefined
};
