import {combineReducers} from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import user from './user'

const persistConfig = {
    key: 'root',
    storage,
  }

const rootReducer = combineReducers({
    user,

})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;