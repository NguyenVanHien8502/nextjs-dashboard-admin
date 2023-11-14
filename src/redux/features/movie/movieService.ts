"use client";
import axios from "axios";

//get all movies
export const getAllMovies = async (
  token: string,
  currentPage: number,
  itemsPerPage: number
) => {
  const { data } = await axios.get(
    `${process.env.BASE_URL}/movie?page=${currentPage}&limit=${itemsPerPage}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
