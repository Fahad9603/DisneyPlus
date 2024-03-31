import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import UserSliec from '../features/user/UserSliec';
import movieReducer  from '../features/movie/movieSliec'

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    user: UserSliec
  },
});


export default store;