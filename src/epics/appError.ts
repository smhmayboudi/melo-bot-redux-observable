import { ofType, StateObservable } from "redux-observable";
import { Observable, throwError } from "rxjs";
import { switchMap } from "rxjs/operators";

import { IAction } from "../../types/iAction";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";

const appError: (
  action$: Observable<IAction>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IAction> = (
  action$: Observable<IAction>,
  _state$: StateObservable<IState> | undefined,
  _dependencies: IDependencies
): Observable<IAction> =>
  action$.pipe(
    ofType(
      actions.addStickerToSet.ADD_STICKER_TO_SET_ERROR,
      actions.answerCallbackQuery.ANSWER_CALLBACK_QUERY_ERROR,
      actions.answerInlineQuery.ANSWER_INLINE_QUERY_ERROR,
      actions.answerPreCheckoutQuery.ANSWER_PRE_CHECKOUT_QUERY_ERROR,
      actions.answerShippingQuery.ANSWER_SHIPPING_QUERY_ERROR,
      actions.chosenInlineResult.CHOSEN_INLINE_RESULT_ERROR,
      actions.createNewStickerSet.CREATE_NEW_STICKER_SET_ERROR,
      actions.deleteChatPhoto.DELETE_CHAT_PHOTO_ERROR,
      actions.deleteChatStickerSet.DELETE_CHAT_STICKER_SET_ERROR,
      actions.deleteMessage.DELETE_MESSAGE_ERROR,
      actions.deleteStickerFromSet.DELETE_STICKER_FROM_SET_ERROR,
      actions.deleteWebhook.DELETE_WEBHOOK_ERROR,
      actions.editMessageCaption.EDIT_MESSAGE_CAPTION_ERROR,
      actions.editMessageLiveLocation.EDIT_MESSAGE_LIVE_LOCATION_ERROR,
      actions.editMessageMedia.EDIT_MESSAGE_MEDIA_ERROR,
      actions.editMessageReplyMarkup.EDIT_MESSAGE_REPLY_MARKUP_ERROR,
      actions.editMessageText.EDIT_MESSAGE_TEXT_ERROR,
      actions.exportChatInviteLink.EXPORT_CHAT_INVITE_LINK_ERROR,
      actions.forwardMessage.FORWARD_MESSAGE_ERROR,
      actions.getChat.GET_CHAT_ERROR,
      actions.getChatAdministrators.GET_CHAT_ADMINISTRATORS_ERROR,
      actions.getChatMember.GET_CHAT_MEMBER_ERROR,
      actions.getChatMembersCount.GET_CHAT_MEMBERS_COUNT_ERROR,
      actions.getFile.GET_FILE_ERROR,
      actions.getGameHighScores.GET_GAME_HIGH_SCORES_ERROR,
      actions.getMe.GET_ME_ERROR,
      actions.getStickerSet.GET_STICKER_SET_ERROR,
      actions.getUpdates.GET_UPDATES_ERROR,
      actions.getUserProfilePhotos.GET_USER_PROFILE_PHOTOS_ERROR,
      actions.getWebhookInfo.GET_WEBHOOK_INFO_ERROR,
      actions.inlineQuery.INLINE_QUERY_ERROR,
      actions.kickChatMember.KICK_CHAT_MEMBER_ERROR,
      actions.leaveChat.LEAVE_CHAT_ERROR,
      actions.pinChatMessage.PIN_CHAT_MESSAGE_ERROR,
      actions.promoteChatMember.PROMOTE_CHAT_MEMBER_ERROR,
      actions.restrictChatMember.RESTRICT_CHAT_MEMBER_ERROR,
      actions.sendAnimation.SEND_ANIMATION_ERROR,
      actions.sendAudio.SEND_AUDIO_ERROR,
      actions.sendChatAction.SEND_CHAT_ACTION_ERROR,
      actions.sendContact.SEND_CONTACT_ERROR,
      actions.sendDocument.SEND_DOCUMENT_ERROR,
      actions.sendGame.SEND_GAME_ERROR,
      actions.sendInvoice.SEND_INVOICE_ERROR,
      actions.sendLocation.SEND_LOCATION_ERROR,
      actions.sendMediaGroup.SEND_MEDIA_GROUP_ERROR,
      actions.sendMessage.SEND_MESSAGE_ERROR,
      actions.sendPhoto.SEND_PHOTO_ERROR,
      actions.sendPoll.SEND_POLL_ERROR,
      actions.sendSticker.SEND_STICKER_ERROR,
      actions.sendVenue.SEND_VENUE_ERROR,
      actions.sendVideo.SEND_VIDEO_ERROR,
      actions.sendVideoNote.SEND_VIDEO_NOTE_ERROR,
      actions.sendVoice.SEND_VOICE_ERROR,
      actions.setChatDescription.SET_CHAT_DESCRIPTION_ERROR,
      actions.setChatPhoto.SET_CHAT_PHOTO_ERROR,
      actions.setChatStickerSet.SET_CHAT_STICKER_SET_ERROR,
      actions.setChatTitle.SET_CHAT_TITLE_ERROR,
      actions.setGameScore.SET_GAME_SCORE_ERROR,
      actions.setPassportDataErrors.SET_PASSPORT_DATA_ERRORS_ERROR,
      actions.setStickerPositionInSet.SET_STICKER_POSITION_IN_SET_ERROR,
      actions.setWebhook.SET_WEBHOOK_ERROR,
      actions.stopMessageLiveLocation.STOP_MESSAGE_LIVE_LOCATION_ERROR,
      actions.stopPoll.STOP_POLL_ERROR,
      actions.unbanChatMember.UNBAN_CHAT_MEMBER_ERROR,
      actions.unpinChatMessage.UNPIN_CHAT_MESSAGE_ERROR,
      actions.uploadStickerFile.UPLOAD_STICKER_FILE_ERROR,
      actions.youtubeDownload.YOUTUBE_DOWNLOAD_ERROR,
      actions.youtubeSearchList.YOUTUBE_SEARCH_LIST_ERROR,
      actions.youtubeVideoList.YOUTUBE_VIDEO_LIST_ERROR
    ),
    switchMap((action: IAction) => throwError(action))
  );

export { appError };
