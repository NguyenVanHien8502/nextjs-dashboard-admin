"use client";
import MovieTable from "@/components/table/movie.table";
import Box from "@mui/material/Box";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Movie() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [sorts, setSorts] = useState({});
  const [loading, setLoading] = useState(false);

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.BASE_URL}/movie?${sorts}&page=${currentPage}&limit=${itemsPerPage}`
      );
      setMovies(data?.data);
      setLoading(false);
    };
    fetchMovies();
  }, [sorts, currentPage, itemsPerPage]);
  return (
    <>
      <Box height={100} width={1000}>
        <MovieTable
          loading={loading}
          setLoading={setLoading}
          movies={movies ?? []}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          setSorts={setSorts}
        />
      </Box>
    </>
  );
}
