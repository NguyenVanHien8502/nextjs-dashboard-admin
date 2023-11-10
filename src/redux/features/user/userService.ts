"use client";
import axios from "axios";
import {
  getProfileError,
  getProfileStart,
  getProfileSuccess,
} from "./userSlice";
import { Dispatch } from "@reduxjs/toolkit";

//get profile
export const getProfile = async (token: string) => {
  const { data } = await axios.get(`${process.env.BASE_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (data?.status === true) {
    return data;
  }
};

//get all users
export const getAllUsers = async (
  token: string,
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
