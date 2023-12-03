import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reducer as printerReducers} from './printersReducers';

const persistConfig = {
  storage: AsyncStorage,
  key: 'printer',
};

const reducers = combineReducers({
  printerReducers,
});

export const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
});

export const persister = persistStore(store);
