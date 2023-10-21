"use client";
import MovieTable from "@/components/table/movie.table";
import Box from "@mui/material/Box";
import axios from "axios";
import useSWR from "swr";

export default function Movie() {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/api/movie",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <Box height={100}>
        <MovieTable movies={data ?? []} />
      </Box>
    </>
  );
}
