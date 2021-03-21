import { Configs } from "../../types/config";
import { Action } from "../storeTypes";
import {
  SET_IS_LOADING,
  SET_CONFIGS,
  SET_SHOULD_FETCH_CONFIGS,
} from "./actionTypes";

export interface GlobalStateType {
  // shouldFetchConfigs  is a variable that only has effect on the server
  shouldFetchConfigs: boolean;
  isLoading: boolean;
  configs: Configs;
}

declare global {
  interface Window {
    __NEXT_DATA__?: {
      props?: {
        configs?: Configs;
      };
    };
  }
}

const initialState: GlobalStateType = {
  shouldFetchConfigs: typeof window !== "undefined" ? false : true,
  isLoading: false,
  configs:
    typeof window !== "undefined" && window?.__NEXT_DATA__?.props?.configs
      ? window.__NEXT_DATA__.props.configs
      : {},
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
  configs(state = initialState.configs, action: Action<Configs>): Configs {
    const { type, payload } = action;
    switch (type) {
      case SET_CONFIGS:
        return payload;
    }
    return state;
  },
  shouldFetchConfigs(
    state = initialState.shouldFetchConfigs,
    action: Action<boolean>
  ): boolean {
    const { type, payload } = action;
    switch (type) {
      case SET_SHOULD_FETCH_CONFIGS:
        return payload;
    }
    return state;
  },
};
