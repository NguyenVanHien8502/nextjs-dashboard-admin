import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  getAllCategories: GetAllCategoriesState;
  getSortsCategory: GetSortsCategoryState;
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

type GetSortsCategoryState = {
  selector: string;
  direction: string;
};

const initialState = {
  getAllCategories: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    allCategories: null,
    currentPage: 1,
    itemsPerPage: 10,
  } as GetAllCategoriesState,
  getSortsCategory: {
    selector: "name",
    direction: "asc",
  } as GetSortsCategoryState,
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
      state.getAllCategories.currentPage = action.payload?.page;
      state.getAllCategories.itemsPerPage = action.payload?.limit;
    },

    getSortsCategory: (state, action: PayloadAction<any>) => {
      state.getSortsCategory.selector = action.payload?.fieldName;
      state.getSortsCategory.direction = action.payload?.direction;
    },
  },
});

export const {
  getAllCategoriesStart,
  getAllCategoriesError,
  getAllCategoriesSuccess,
  getSortsCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
