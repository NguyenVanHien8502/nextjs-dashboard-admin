"use client";

import ProductTable from "@/components/table/product.table";
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
      <ProductTable products={data?.allProduct ?? []} />
    </>
  );
};

export default ProductPage;
