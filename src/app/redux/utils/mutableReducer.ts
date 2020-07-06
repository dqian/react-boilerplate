import { produce } from 'immer';
import { AnyAction } from 'redux';
import isFunction from 'lodash.isfunction';

const createMutableReducer = <T = { [key: string]: any }>(
  initialState: T,
  reducer: { [key: string]: (draft: T, action: AnyAction) => void }
) => {
  return (state = initialState, action: AnyAction) => {
    return produce(state, (draft) => {
      const updater = reducer[action.type];
      return isFunction(updater) ? updater(draft, action) : draft;
    });
  };
}
export default createMutableReducer;