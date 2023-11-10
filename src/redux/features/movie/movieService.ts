"use client";
import axios from "axios";

//get all movies
export const getAllMovies = async (
  token: string,
  sorts: {},
  currentPage: number,
  itemsPerPage: number
) => {
  const { data } = await axios.get(
    `${process.env.BASE_URL}/movie?${sorts}&page=${currentPage}&limit=${itemsPerPage}`,
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
