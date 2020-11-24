import { SET_IS_LOADING } from "./actionTypes";
import { Action } from "../storeTypes";

export function setIsLoadingAction(isLoading: boolean): Action {
  return {
    type: SET_IS_LOADING,
    payload: isLoading,
  };
}
