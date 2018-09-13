import { IInlineQueryResult } from "../inlineMode/iInlineQueryResult";
import { IInputMessageContent } from "../inlineMode/iInputMessageContent";

export interface IInlineQueryResultCachedSticker extends IInlineQueryResult {
  input_message_content?: IInputMessageContent;
  sticker_file_id: string;
}