import type { Action } from "../actions/types";
import { SET_INDEX, RECEIVE_LIST } from "../actions/list";

export type State = {
  list: string
};

const initialState = {
  list: [
    {data: {title: "Something"}},
    {data: {title: "Something Else"}}
  ],
  selectedIndex: undefined
};

export default function(state: State = initialState, action: Action): State {
  if (action.type === SET_INDEX) {
    return {
      ...state,
      selectedIndex: action.payload
    };
  }
  if (action.type === RECEIVE_LIST) {
    return {...state, list: action.payload}
  }
  return state;
}
