import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  getAllMovies: GetAllMoviesState;
  getSortsMovie: GetSortsMovieState;
};

type GetAllMoviesState = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  allMovies: IMovie[] | null;
  currentPage: number;
  itemsPerPage: number;
};

type GetSortsMovieState = {
  selector: string;
  direction: string;
};

const initialState = {
  getAllMovies: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    allMovies: null,
    currentPage: 1,
    itemsPerPage: 10,
  } as GetAllMoviesState,
  getSortsMovie: {
    selector: "name",
    direction: "asc",
  } as GetSortsMovieState,
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
      state.getAllMovies.allMovies = action.payload?.data;
      state.getAllMovies.currentPage = action.payload?.page;
      state.getAllMovies.itemsPerPage = action.payload?.limit;
    },

    getSortsMovie: (state, action: PayloadAction<any>) => {
      state.getSortsMovie.selector = action.payload?.fieldName;
      state.getSortsMovie.direction = action.payload?.direction;
    },
  },
});

export const {
  getAllMoviesStart,
  getAllMoviesError,
  getAllMoviesSuccess,
  getSortsMovie,
} = movieSlice.actions;

export default movieSlice.reducer;
