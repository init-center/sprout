import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import globalReducers, { GlobalStateType } from "./global/reducers";
import homeReducers, { HomeStateType } from "./home/reducers";


export interface StateType extends GlobalStateType, HomeStateType {};

const reducers = Object.assign({}, globalReducers, homeReducers);

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default createStore(combineReducers(reducers), composeEnhancers(applyMiddleware(thunk)));