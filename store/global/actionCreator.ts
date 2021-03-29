import {
  SET_CONFIGS,
  SET_IS_DARK_MODE,
  SET_IS_LOADING,
  SET_IS_MENU_SHOW,
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

export function setIsMenuShowAction(isMenuShow: boolean): Action {
  return {
    type: SET_IS_MENU_SHOW,
    payload: isMenuShow,
  };
}

export function setIsDarkModeAction(isDarkMode: boolean): Action {
  return {
    type: SET_IS_DARK_MODE,
    payload: isDarkMode,
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
