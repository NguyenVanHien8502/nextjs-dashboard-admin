"use client";
import CategoryTable from "@/components/table/category.table";
import Box from "@mui/material/Box";
import axios from "axios";
import useSWR from "swr";

export default function Category() {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/api/category",
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
        <CategoryTable categories={data ?? []} />
      </Box>
    </>
  );
}
