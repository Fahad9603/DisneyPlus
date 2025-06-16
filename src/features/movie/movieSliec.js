import { createSlice } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";

const initialState = {
    newDisney: null,
    recommend: null,
    original: null,
    trending: null,
};

const convertTimestamps = (movies) => {
    if (!movies) return null; 

    return movies.map(movie => ({
        ...movie,
        timestamp: movie.timestamp instanceof Timestamp ? movie.timestamp.toMillis() : movie.timestamp
    }));
};

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.newDisney = convertTimestamps(action.payload.newDisney);
            state.recommend = convertTimestamps(action.payload.recommend);
            state.original = convertTimestamps(action.payload.original);
            state.trending = convertTimestamps(action.payload.trending);
        }
    }
});

export const { setMovies } = movieSlice.actions;

export const selectMovies = (state) => state.movie.newDisney;
export const selectRecommend = (state) => state.movie.recommend;
export const selectOriginal = (state) => state.movie.original;
export const selectTrending = (state) => state.movie.trending;

export default movieSlice.reducer;
