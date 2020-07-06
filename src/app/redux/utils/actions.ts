import { Action } from "redux";

export interface IActionMeta {
  success?: (res?: any) => void;
  error?: (error: Error) => void;
  finally?: (res?: any, error?: Error) => void;
}

export interface IActionWithPayload<T, U = any> extends Action<U> {
  payload: T;
  actionMeta?: IActionMeta;
}