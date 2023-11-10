import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  getAllCategories: GetAllCategoriesState;
};

type GetAllCategoriesState = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  allCategories: ICategory[] | null;
  sorts: Object;
  currentPage: number;
  itemsPerPage: number;
};

const initialState = {
  getAllCategories: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    allCategories: null,
    sorts: { name: "asc" },
    currentPage: 1,
    itemsPerPage: 10,
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
      state.getAllCategories.allCategories = action.payload?.data;
      state.getAllCategories.sorts = action.payload?.sortOrder;
      state.getAllCategories.currentPage = action.payload?.page;
      state.getAllCategories.itemsPerPage = action.payload?.limit;
    },
  },
});

export const {
  getAllCategoriesStart,
  getAllCategoriesError,
  getAllCategoriesSuccess,
} = categorySlice.actions;

export default categorySlice.reducer;
