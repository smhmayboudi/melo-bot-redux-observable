import { IAnimation } from "./iAnimation";
import { IAudio } from "./iAudio";
import { IChat } from "./iChat";
import { IContact } from "./iContact";
import { IDocument } from "./iDocument";
import { ILocation } from "./iLocation";
import { IMessageEntity } from "./iMessageEntity";
import { IPhotoSize } from "./iPhotoSize";
import { IUser } from "./iUser";
import { IVideo } from "./iVideo";
import { IVideoNote } from "./iVideoNote";
import { IVenue } from "./iVenue";
import { IVoice } from "./iVoice";
import { IGame } from "../games/iGame";
import { IInlineKeyboardMarkup } from "./iInlineKeyboardMarkup";
import { IInvoice } from "../payments/iInvoice";
import { ISuccessfulPayment } from "../payments/iSuccessfulPayment";
import { IPassportData } from "../passport/iPassportData";
import { IPoll } from "./iPoll";
import { ISticker } from "../stickers/iSticker";

export interface IMessage {
    animation?: IAnimation;
    audio?: IAudio;
    author_signature?: string;
    caption?: string;
    caption_entities?: IMessageEntity[];
    channel_chat_created?: boolean;
    chat: IChat;
    connected_website?: string;
    contact?: IContact;
    date: number;
    delete_chat_photo?: boolean;
    document?: IDocument;
    edit_date?: number;
    entities?: IMessageEntity[];
    forward_date?: number;
    forward_from?: IUser;
    forward_from_chat?: IChat;
    forward_from_message_id?: number;
    forward_sender_name?: string;
    forward_signature?: string;
    from?: IUser;
    game?: IGame;
    group_chat_created?: boolean;
    invoice?: IInvoice;
    left_chat_member?: IUser;
    location?: ILocation;
    media_group_id?: string;
    message_id: number;
    migrate_from_chat_id?: number;
    migrate_to_chat_id?: number;
    new_chat_members?: IUser[];
    new_chat_photo?: IPhotoSize[];
    new_chat_title?: string;
    passport_data?: IPassportData;
    photo?: IPhotoSize[];
    pinned_message?: IMessage;
    poll?: IPoll;
    reply_markup?: IInlineKeyboardMarkup;
    reply_to_message?: IMessage;
    sticker?: ISticker;
    successful_payment?: ISuccessfulPayment;
    supergroup_chat_created?: boolean;
    text?: string;
    venue?: IVenue;
    video?: IVideo;
    video_note?: IVideoNote;
    voice?: IVoice;
}