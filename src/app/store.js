import { configureStore } from '@reduxjs/toolkit';
import UserSliec from '../features/user/UserSliec';
import movieReducer  from '../features/movie/movieSliec'

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    user: UserSliec
  },
});


export default store;