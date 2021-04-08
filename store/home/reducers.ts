import { Action } from "../storeTypes";
import { SET_IS_MENU_SHOW } from "./actionTypes";

export interface HomeStateType {
  isMenuShow: boolean;
}

const initialState: HomeStateType = {
  isMenuShow: false,
};

const reducers = {
  isMenuShow(
    state = initialState.isMenuShow,
    action: Action<boolean>
  ): boolean {
    const { type, payload } = action;
    switch (type) {
      case SET_IS_MENU_SHOW:
        return payload;
    }
    return state;
  },
};

export default reducers;
