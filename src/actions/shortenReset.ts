import { IActionShortenReset } from "../../types/iActionShortenReset";
import { IStateShortenReset } from "../../types/iStateShortenReset";

const initialState: IStateShortenReset = {};

const SHORTEN_RESET_ERROR = "SHORTEN_RESET_ERROR";
const SHORTEN_RESET_QUERY = "SHORTEN_RESET_QUERY";
const SHORTEN_RESET_RESULT = "SHORTEN_RESET_RESULT";

const error: (shortenReset: IStateShortenReset) => IActionShortenReset = (
  shortenReset: IStateShortenReset
): IActionShortenReset => ({
  shortenReset: { error: shortenReset.error },
  type: SHORTEN_RESET_ERROR
});
const query: (shortenReset: IStateShortenReset) => IActionShortenReset = (
  shortenReset: IStateShortenReset
): IActionShortenReset => ({
  shortenReset: { query: shortenReset.query },
  type: SHORTEN_RESET_QUERY
});
const result: (shortenReset: IStateShortenReset) => IActionShortenReset = (
  shortenReset: IStateShortenReset
): IActionShortenReset => ({
  shortenReset: { result: shortenReset.result },
  type: SHORTEN_RESET_RESULT
});

export {
  initialState,
  SHORTEN_RESET_ERROR,
  SHORTEN_RESET_QUERY,
  SHORTEN_RESET_RESULT,
  error,
  query,
  result
};
