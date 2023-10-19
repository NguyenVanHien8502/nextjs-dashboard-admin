"use client";

import AppTable from "@/components/app.table";
import useSWR from "swr";
import axios from "axios";

const ProductPage = () => {
  // const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/api/product",
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
      <AppTable products={data?.allProduct ?? []} />
    </>
  );
};

export default ProductPage;
