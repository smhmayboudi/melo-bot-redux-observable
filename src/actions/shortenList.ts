import { IActionShortenList } from "../../types/iActionShortenList";
import { IStateShortenList } from "../../types/iStateShortenList";

const initialState: IStateShortenList = {};

const SHORTEN_LIST_ERROR = "SHORTEN_LIST_ERROR";
const SHORTEN_LIST_QUERY = "SHORTEN_LIST_QUERY";
const SHORTEN_LIST_RESULT = "SHORTEN_LIST_RESULT";

const error: (shortenList: IStateShortenList) => IActionShortenList = (
  shortenList: IStateShortenList
): IActionShortenList => ({
  shortenList: { error: shortenList.error },
  type: SHORTEN_LIST_ERROR
});
const query: (shortenList: IStateShortenList) => IActionShortenList = (
  shortenList: IStateShortenList
): IActionShortenList => ({
  shortenList: { query: shortenList.query },
  type: SHORTEN_LIST_QUERY
});
const result: (shortenList: IStateShortenList) => IActionShortenList = (
  shortenList: IStateShortenList
): IActionShortenList => ({
  shortenList: { result: shortenList.result },
  type: SHORTEN_LIST_RESULT
});

export {
  initialState,
  SHORTEN_LIST_ERROR,
  SHORTEN_LIST_QUERY,
  SHORTEN_LIST_RESULT,
  error,
  query,
  result
};
