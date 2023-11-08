import { getStogare } from "@/app/helper/stogare";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  getProfile: GetProfileState;
  getAllUsers: GetAllUsersState;
};

type GetProfileState = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  profile: string | any;
};

type GetAllUsersState = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  allUsers: IUser[] | null;
  sorts: {} | null;
  currentPage: number;
  itemsPerPage: number;
};

const initialState = {
  getProfile: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    profile: getStogare("currentUser"),
  } as GetProfileState,
  getAllUsers: {
    allUsers: null,
    sorts: null,
    currentPage: 1,
    itemsPerPage: 10,
    isLoading: false,
    isError: false,
    isSuccess: false,
  } as GetAllUsersState,
} as InitialState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //profile
    getProfileStart: (state) => {
      state.getProfile.isLoading = true;
      state.getProfile.isError = false;
      state.getProfile.isSuccess = false;
    },
    getProfileError: (state) => {
      state.getProfile.isLoading = false;
      state.getProfile.isError = true;
      state.getProfile.isSuccess = false;
    },
    getProfileSuccess: (state, action: PayloadAction<any>) => {
      state.getProfile.isLoading = false;
      state.getProfile.isError = false;
      state.getProfile.isSuccess = true;
      state.getProfile.profile = action.payload;
    },

    //getAllUsers
    getAllUsersStart: (state) => {
      state.getAllUsers.isLoading = true;
      state.getAllUsers.isError = false;
      state.getAllUsers.isSuccess = false;
    },
    getAllUsersError: (state) => {
      state.getAllUsers.isLoading = false;
      state.getAllUsers.isError = true;
      state.getAllUsers.isSuccess = false;
    },
    getAllUsersSuccess: (state, action: PayloadAction<any>) => {
      state.getAllUsers.isLoading = false;
      state.getAllUsers.isError = false;
      state.getAllUsers.isSuccess = true;
      state.getAllUsers.allUsers = action.payload;
      state.getAllUsers.sorts = action.payload?.sortOrder;
      state.getAllUsers.currentPage = action.payload?.page;
      state.getAllUsers.itemsPerPage = action.payload?.limit;
    },
  },
});

export const {
  getProfileStart,
  getProfileError,
  getProfileSuccess,
  getAllUsersStart,
  getAllUsersError,
  getAllUsersSuccess,
} = userSlice.actions;

export default userSlice.reducer;
