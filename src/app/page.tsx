"use client";

import AppTable from "@/components/app.table";
import axios from "axios";
import useSWR from "swr";

export default function Home() {
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
  if (!data) {
    return <h1>Loading...</h1>;
  }
  return (
    <main>
      <AppTable products={data?.allProduct} />
    </main>
  );
}
