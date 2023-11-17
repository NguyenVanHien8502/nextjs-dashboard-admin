"use client";
import axios from "axios";

//get profile
export const getProfile = async (token: string) => {
  const { data } = await axios.get(`${process.env.BASE_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//get all users
export const getAllUsers = async (
  token: string,
  currentPage: number,
  itemsPerPage: number
) => {
  const { data } = await axios.get(
    `${process.env.BASE_URL}/user?page=${currentPage}&limit=${itemsPerPage}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
