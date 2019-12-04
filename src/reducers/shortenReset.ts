import { IActionShortenReset } from "../../types/iActionShortenReset";
import { IStateShortenReset } from "../../types/iStateShortenReset";
import * as actions from "../actions";

const shortenReset: (
  state: IStateShortenReset | undefined,
  action: IActionShortenReset
) => IStateShortenReset = (
  state: IStateShortenReset | undefined = actions.shortenReset.initialState,
  action: IActionShortenReset
): IStateShortenReset => {
  switch (action.type) {
    case actions.shortenReset.SHORTEN_RESET_ERROR:
      return { error: action.shortenReset.error, query: state.query };
    case actions.shortenReset.SHORTEN_RESET_QUERY:
      return { query: action.shortenReset.query };
    case actions.shortenReset.SHORTEN_RESET_RESULT:
      return { query: state.query, result: action.shortenReset.result };
    default:
      return state;
  }
};

export { shortenReset };
