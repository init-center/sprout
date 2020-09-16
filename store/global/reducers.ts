import { Action } from "../storeTypes";
import { SET_IS_LOADING } from "./actionTypes";

export interface GlobalStateType {
  isLoading: boolean;
}

const initialState: GlobalStateType = {
  isLoading: false,
};

export default {
  isLoading(state = initialState.isLoading, action: Action<boolean>): boolean {
    const { type, payload } = action;
    switch (type) {
      case SET_IS_LOADING:
        return payload;
    }
    return state;
  },
};
