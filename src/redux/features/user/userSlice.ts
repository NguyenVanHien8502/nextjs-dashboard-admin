import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  getAllUsers: {
    allUsers: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
} as any;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //getAllUsers
    getAllUsersStart: (state) => {
      (state.getAllUsers.isLoading = true),
        (state.getAllUsers.isError = false),
        (state.getAllUsers.isSuccess = false);
    },
    getAllUsersError: (state) => {
      (state.getAllUsers.isLoading = false),
        (state.getAllUsers.isError = true),
        (state.getAllUsers.isSuccess = false);
    },
    getAllUsersSuccess: (state, action: PayloadAction<any>) => {
      (state.getAllUsers.isLoading = false),
        (state.getAllUsers.isError = false),
        (state.getAllUsers.isSuccess = true),
        (state.getAllUsers.allUsers = action.payload);
    },
  },
});

export const { getAllUsersStart, getAllUsersError, getAllUsersSuccess } =
  userSlice.actions;

export default userSlice.reducer;
