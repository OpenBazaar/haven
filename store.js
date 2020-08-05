import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import Reactotron from 'reactotron-react-native';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers';
import mainSaga from './reducers/saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
    Reactotron.createEnhancer(),
  ),
);

sagaMiddleware.run(mainSaga);

export const persistor = persistStore(store);

export default store;
