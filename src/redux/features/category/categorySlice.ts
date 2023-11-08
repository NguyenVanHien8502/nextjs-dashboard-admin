import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  getAllCategories: GetAllCategoriesState;
};

type GetAllCategoriesState = {
  allCategories: ICategory[] | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

const initialState = {
  getAllCategories: {
    allCategories: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
  } as GetAllCategoriesState,
} as InitialState;

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    //getAllCategories
    getAllCategoriesStart: (state) => {
      state.getAllCategories.isLoading = true;
      state.getAllCategories.isError = false;
      state.getAllCategories.isSuccess = false;
    },
    getAllCategoriesError: (state) => {
      state.getAllCategories.isLoading = false;
      state.getAllCategories.isError = true;
      state.getAllCategories.isSuccess = false;
    },
    getAllCategoriesSuccess: (state, action: PayloadAction<any>) => {
      state.getAllCategories.isLoading = false;
      state.getAllCategories.isError = false;
      state.getAllCategories.isSuccess = true;
      state.getAllCategories.allCategories = action.payload;
    },
  },
});

export const {
  getAllCategoriesStart,
  getAllCategoriesError,
  getAllCategoriesSuccess,
} = categorySlice.actions;

export default categorySlice.reducer;
