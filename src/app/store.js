import { configureStore } from '@reduxjs/toolkit';
import movieReducer  from '../features/movie/movieSliec'
import  loaderReducer  from '../features/Loader/loadingSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '../features/user/UserSliec';


const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);
export const store = configureStore({
  reducer: {
    movie: movieReducer,
    user: persistedReducer,
    loader: loaderReducer
  },
});


export const persistor = persistStore(store);