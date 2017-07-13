
import type { Action } from './types';

export const SET_INDEX = 'SET_INDEX';
export const RECEIVE_LIST = 'RECEIVE_LIST';

export function setIndex(index:number):Action {
  return {
    type: SET_INDEX,
    payload: index,
  };
}

export function receiveList(list) {
  return {
    type: RECEIVE_LIST,
    payload: list,
  };
}
