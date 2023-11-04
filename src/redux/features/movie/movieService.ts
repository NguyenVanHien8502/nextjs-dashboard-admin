"use client";
import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import {
  getAllMoviesError,
  getAllMoviesStart,
  getAllMoviesSuccess,
} from "./movieSlice";

//get all movies
export const getAllMovies = async (token: string | any, dispatch: Dispatch) => {
  dispatch(getAllMoviesStart());
  try {
    const { data } = await axios.get(`${process.env.BASE_URL}/movie`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data?.status === true) {
      dispatch(getAllMoviesSuccess(data?.data));
      return data?.data;
    }
  } catch (error) {
    dispatch(getAllMoviesError());
  }
};
