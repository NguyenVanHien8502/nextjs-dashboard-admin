"use client";
import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { getAllCategoriesError, getAllCategoriesStart, getAllCategoriesSuccess } from "./categorySlice";

//get all categories
export const getAllCategories = async (token: string | any, dispatch: Dispatch) => {
  dispatch(getAllCategoriesStart());
  try {
    const { data } = await axios.get(`${process.env.BASE_URL}/category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data?.status === true) {
      dispatch(getAllCategoriesSuccess(data?.data));
      return data?.data;
    }
  } catch (error) {
    dispatch(getAllCategoriesError());
  }
};
