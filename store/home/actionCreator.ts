import { SET_IS_MENU_SHOW } from "./actionTypes";
import { Action } from "../storeTypes";

export function setIsMenuShowAction(isMenuShow: boolean): Action {
  return {
    type: SET_IS_MENU_SHOW,
    payload: isMenuShow,
  };
}
