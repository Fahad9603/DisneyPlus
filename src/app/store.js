import { configureStore } from '@reduxjs/toolkit';
import UserSliec from '../features/user/UserSliec';
import movieReducer  from '../features/movie/movieSliec'
import  loaderReducer  from '../features/Loader/loadingSlice';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    user: UserSliec,
    loader: loaderReducer
  },
});


export default store;