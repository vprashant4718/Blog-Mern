import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/createSlice';
import themeReducer from './slice/themeSlice';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import themeSlice from './slice/themeSlice';

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store =  configureStore({
  reducer: persistedReducer,
  middleware:((getDefaulMiddleware)=>getDefaulMiddleware({serializableCheck : false }))
})


export const persistor = persistStore(store)