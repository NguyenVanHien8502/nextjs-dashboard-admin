"use client";
import axios from "axios";
import { toast } from "react-toastify";

//login user
export const logInUser = async (dataInput: any) => {
  try {
    const { data } = await axios.post(
      `${process.env.BASE_URL}/user/login/user`,
      dataInput
    );
    return data;
  } catch (error: any) {
    error?.response?.data?.message.map((msg: string) => {
      toast.error(msg);
    });
    return;
  }
};

//login admin
export const logInAdmin = async (dataInput: any) => {
  try {
    const { data } = await axios.post(
      `${process.env.BASE_URL}/user/login/admin`,
      dataInput
    );
    return data;
  } catch (error: any) {
    error?.response?.data?.message.map((msg: string) => {
      toast.error(msg);
    });
    return;
  }
};

//register
export const registerUser = async (dataInput: any) => {
  try {
    const { data } = await axios.post(
      `${process.env.BASE_URL}/user/register`,
      dataInput
    );
    return data;
  } catch (error: any) {
    error?.response?.data?.message.map((msg: string) => {
      toast.error(msg);
    });
    return;
  }
};
