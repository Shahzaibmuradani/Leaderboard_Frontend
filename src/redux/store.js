import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import rootReducer from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const middleware = applyMiddleware(thunk);

const persistedConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistedConfig, rootReducer);
const store = createStore(persistedReducer, middleware);
const persister = persistStore(store);

export {store, persister};
