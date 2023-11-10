"use client";
import axios from "axios";

//login user
export const logInUser = async (dataInput: any) => {
  const { data } = await axios.post(
    `${process.env.BASE_URL}/user/login/user`,
    dataInput
  );
  return data;
};

//login admin
export const logInAdmin = async (dataInput: any) => {
  const { data } = await axios.post(
    `${process.env.BASE_URL}/user/login/admin`,
    dataInput
  );
  return data;
};

//register
export const registerUser = async (dataInput: any) => {
  const { data } = await axios.post(
    `${process.env.BASE_URL}/user/register`,
    dataInput
  );
  return data;
};
