import { IInlineKeyboardMarkup } from "../types/iInlineKeyboardMarkup";
import { IMessage } from "../types/iMessage";

export interface sendGame {
    (
        game_short_name: string,
        chat_id: number,
        disable_notification?: boolean,
        reply_markup?: IInlineKeyboardMarkup,
        reply_to_message_id?: number,
    ): IMessage
}