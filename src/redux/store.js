import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import printerReducer from './printersReducers';

const persistConfig = {
  storage: AsyncStorage,
  key: ['printer', 'mainPrinter'],
};

const reducers = combineReducers({
  printerReducers: printerReducer,
});

export const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
});

export const persister = persistStore(store);
