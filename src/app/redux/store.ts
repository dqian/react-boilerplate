import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'app/redux/rootReducer';
import rootSaga from 'app/redux/rootSaga';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware()

export function configureStore() {
  const store = createStore(
    rootReducer, 
    applyMiddleware(sagaMiddleware)
  );

  let sagaTask = sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('app/redux/rootReducer', () => {
      const nextReducer = require('app/redux/rootReducer');
      store.replaceReducer(nextReducer);
    });

    module.hot.accept('app/redux/rootSaga', () => {
      const newRootSaga = require('app/redux/rootSaga');
      sagaTask.cancel();
      // @ts-ignore done is a property on `sagaMiddleware`
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(newRootSaga);
      });
    });
  }

  return store;
}
