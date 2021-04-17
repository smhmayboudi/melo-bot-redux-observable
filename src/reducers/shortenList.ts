import { IActionShortenList } from "../../types/iActionShortenList";
import { IStateShortenList } from "../../types/iStateShortenList";
import * as actions from "../actions";

const shortenList: (
  state: IStateShortenList | undefined,
  action: IActionShortenList
) => IStateShortenList = (
  state: IStateShortenList | undefined = actions.shortenList.initialState,
  action: IActionShortenList
): IStateShortenList => {
  switch (action.type) {
    case actions.shortenList.SHORTEN_LIST_ERROR:
      return { error: action.shortenList.error, query: state.query };
    case actions.shortenList.SHORTEN_LIST_QUERY:
      return { query: action.shortenList.query };
    case actions.shortenList.SHORTEN_LIST_RESULT:
      return { query: state.query, result: action.shortenList.result };
    default:
      return state;
  }
};

export { shortenList };
