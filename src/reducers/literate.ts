import { IActionLiterate } from "../../types/iActionLiterate";
import { IStateLiterate } from "../../types/iStateLiterate";
import * as actions from "../actions";

const literate:
  (
    state: IStateLiterate | undefined,
    action: IActionLiterate,
  ) =>
    IStateLiterate =
  (
    state: IStateLiterate | undefined = actions.literate.initalState,
    action: IActionLiterate,
  ):
    IStateLiterate => {
    switch (action.type) {
      case actions.literate.LITERATE_ERROR:
        return { error: action.literate.error, query: state.query };
      case actions.literate.LITERATE_QUERY:
        return { query: action.literate.query };
      case actions.literate.LITERATE_RESULT:
        return { query: state.query, result: action.literate.result };
      default:
        return state;
    }
  };

export { literate };
