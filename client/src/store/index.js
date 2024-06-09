import { createStore } from 'redux';
import reducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistedReducer = persistReducer({ key: 'root', storage }, reducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
