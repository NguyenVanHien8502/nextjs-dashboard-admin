"use client";
import axios from "axios";

//login
export const logIn = async (dataInput: any) => {
  const { data } = await axios.post(
    `${process.env.BASE_URL}/user/login`,
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
