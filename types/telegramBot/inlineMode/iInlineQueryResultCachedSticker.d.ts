import { IInlineQueryResult } from "./iInlineQueryResult";
import { IInputMessageContent } from "./iInputMessageContent";

export interface IInlineQueryResultCachedSticker extends IInlineQueryResult {
  input_message_content?: IInputMessageContent;
  sticker_file_id: string;
}
