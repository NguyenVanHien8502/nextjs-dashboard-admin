"use client";
import axios from "axios";

//get all categories
export const getAllCategories = async (
  token: string,
  currentPage: number,
  itemsPerPage: number
) => {
  const { data } = await axios.get(
    `${process.env.BASE_URL}/category?page=${currentPage}&limit=${itemsPerPage}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};
