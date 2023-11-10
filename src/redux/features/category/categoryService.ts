"use client";
import axios from "axios";

//get all categories
export const getAllCategories = async (
  token: string,
  sorts: {},
  currentPage: number,
  itemsPerPage: number
) => {
  const { data } = await axios.get(
    `${process.env.BASE_URL}/category?${sorts}&page=${currentPage}&limit=${itemsPerPage}`,
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
