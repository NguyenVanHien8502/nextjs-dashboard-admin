"use client";
import axios from "axios";
import {
  logInError,
  logInStart,
  logInSuccess,
  registerError,
  registerStart,
  registerSuccess,
} from "./authSlice";
import { toast } from "react-toastify";
import { setStogare } from "@/app/helper/stogare";
import { Dispatch } from "@reduxjs/toolkit";

//login
export const logIn = async (dataInput: any, dispatch: Dispatch) => {
  dispatch(logInStart());
  try {
    const { data } = await axios.post(
      `${process.env.BASE_URL}/user/login`,
      dataInput
    );
    const currentUser = data?.user;
    if (data?.status === true && currentUser) {
      setStogare("currentUser", JSON.stringify(currentUser));
      toast.success(data?.msg);
      dispatch(logInSuccess(data?.user));
      return data;
    }
    if (data?.status === false) {
      toast.warning(data?.msg);
      dispatch(logInError());
    }
  } catch (error) {
    dispatch(logInError());
  }
};

//register
export const registerUser = async (dataInput: any, dispatch: Dispatch) => {
  dispatch(registerStart());
  try {
    const { data } = await axios.post(
      `${process.env.BASE_URL}/user/register`,
      dataInput
    );
    if (data?.status === false) {
      toast.warning(data?.msg);
      dispatch(registerError());
      return;
    }

    if (data?.status === true) {
      toast.success(data?.msg);
      dispatch(registerSuccess());
      return data;
    }
  } catch (error) {
    dispatch(registerError());
  }
};
