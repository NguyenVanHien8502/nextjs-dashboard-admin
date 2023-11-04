"use client";
import axios from "axios";
import {
  getAllUsersError,
  getAllUsersStart,
  getAllUsersSuccess,
} from "./userSlice";
import { Dispatch } from "@reduxjs/toolkit";

//get all users
export const getAllUsers = async (token: string | any, dispatch: Dispatch) => {
  dispatch(getAllUsersStart());
  try {
    const { data } = await axios.get(`${process.env.BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data?.status === true) {
      dispatch(getAllUsersSuccess(data?.data));
      return data?.data;
    }
  } catch (error) {
    dispatch(getAllUsersError());
  }
};
