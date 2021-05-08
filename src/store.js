// import {createStore, applyMiddleware} from 'redux';
// import {composeWithDevTools} from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers';

// const initialState = {};

// const middlerware = [thunk];

// const store = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middlerware)),
// );

// export default store;

// import {createStore, applyMiddleware, combineReducers} from 'redux';
// import reducers from './reducers';
// import thunk from 'redux-thunk';

// const middlewares = applyMiddleware(thunk);
// const mainReducer = combineReducers(reducers);
// export const store = createStore(mainReducer, {}, middlewares);

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import rootReducer from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import SyncStorage from 'sync-storage';
// import logger from 'redux-logger';

const middleware = applyMiddleware(thunk);

const persistedConfig = {
  key: 'root',
  storage: AsyncStorage,
  // blacklist: ['authReducer', 'userReducer', 'homeReducer'],
  // blacklist: ['userReducer', 'homeReducer'],
};

const persistedReducer = persistReducer(persistedConfig, rootReducer);
const store = createStore(persistedReducer, middleware);
const persister = persistStore(store);

export {store, persister};
