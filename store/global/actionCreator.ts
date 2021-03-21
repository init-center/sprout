import {
  SET_CONFIGS,
  SET_IS_LOADING,
  SET_SHOULD_FETCH_CONFIGS,
} from "./actionTypes";
import { Action } from "../storeTypes";
import { Configs } from "../../types/config";

export function setIsLoadingAction(isLoading: boolean): Action {
  return {
    type: SET_IS_LOADING,
    payload: isLoading,
  };
}

export function setConfigsAction(configs: Configs): Action {
  return {
    type: SET_CONFIGS,
    payload: configs,
  };
}

export function setShouldFetchConfigsAction(
  shouldFetchConfigs: boolean
): Action {
  return {
    type: SET_SHOULD_FETCH_CONFIGS,
    payload: shouldFetchConfigs,
  };
}
