import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  getAllMovies: GetAllMoviesState;
};

type GetAllMoviesState = {
  allMovies: IMovie[] | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

const initialState = {
  getAllMovies: {
    allMovies: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
  } as GetAllMoviesState,
} as InitialState;

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    //getAllMovies
    getAllMoviesStart: (state) => {
      state.getAllMovies.isLoading = true;
      state.getAllMovies.isError = false;
      state.getAllMovies.isSuccess = false;
    },
    getAllMoviesError: (state) => {
      state.getAllMovies.isLoading = false;
      state.getAllMovies.isError = true;
      state.getAllMovies.isSuccess = false;
    },
    getAllMoviesSuccess: (state, action: PayloadAction<any>) => {
      state.getAllMovies.isLoading = false;
      state.getAllMovies.isError = false;
      state.getAllMovies.isSuccess = true;
      state.getAllMovies.allMovies = action.payload;
    },
  },
});

export const { getAllMoviesStart, getAllMoviesError, getAllMoviesSuccess } =
  movieSlice.actions;

export default movieSlice.reducer;
