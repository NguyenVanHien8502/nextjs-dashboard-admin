import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  getAllMovies: GetAllMoviesState;
};

type GetAllMoviesState = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  allMovies: IMovie[] | null;
  sorts: Object;
  currentPage: number;
  itemsPerPage: number;
};

const initialState = {
  getAllMovies: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    allMovies: null,
    sorts: { name: "asc" },
    currentPage: 1,
    itemsPerPage: 10,
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
      state.getAllMovies.allMovies = action.payload?.data;
      state.getAllMovies.sorts = action.payload?.sortOrder;
      state.getAllMovies.currentPage = action.payload?.page;
      state.getAllMovies.itemsPerPage = action.payload?.limit;
    },
  },
});

export const { getAllMoviesStart, getAllMoviesError, getAllMoviesSuccess } =
  movieSlice.actions;

export default movieSlice.reducer;
