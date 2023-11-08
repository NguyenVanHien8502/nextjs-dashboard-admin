"use client";
import axios from "axios";
import {
  getAllUsersError,
  getAllUsersStart,
  getAllUsersSuccess,
  getProfileError,
  getProfileStart,
  getProfileSuccess,
} from "./userSlice";
import { Dispatch } from "@reduxjs/toolkit";

//get profile
export const getProfile = async (token: string | any, dispatch: Dispatch) => {
  dispatch(getProfileStart());
  try {
    const { data } = await axios.get(`${process.env.BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data?.status === true) {
      dispatch(getProfileSuccess(data?.profile));
      return data?.profile;
    }
  } catch (error) {
    dispatch(getProfileError());
  }
};

//get all users
export const getAllUsers = async (
  token: string | any,
  sorts: {},
  currentPage: number,
  itemsPerPage: number
) => {
  const { data } = await axios.get(
    `${process.env.BASE_URL}/user?${sorts}&page=${currentPage}&limit=${itemsPerPage}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (data?.status === true) {
    return data;
  }
};
