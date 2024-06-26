import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    newDisney: null,
    recommend: null,
    original: null,
    trending: null,
};
const movieSlice = createSlice({
    name: "movie", 
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.newDisney = action.payload.newDisney; 
            state.recommend = action.payload.recommend;
            state.original = action.payload.original;
            state.trending = action.payload.trending;
            
        }
    }
});



export const { setMovies } = movieSlice.actions;

export const selectMovies = (state) => state.movie.newDisney; 
export const selectRecommend = (state) => state.movie.recommend;
export const selectOriginal = (state) => state.movie.original;
export const selectTrending = (state) => state.movie.trending;

export default movieSlice.reducer; 