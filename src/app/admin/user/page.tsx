"use client";
import UserTable from "@/components/table/user.table";
import Box from "@mui/material/Box";
import useSWR from "swr";
import axios from "axios";

export default function User() {
  const currentUserString = localStorage.getItem("currentUser");
  let token: string | null = null;
  if (currentUserString !== null) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.BASE_URL}/user`,
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
        <UserTable users={data?.allUsers ?? []} />
      </Box>
    </>
  );
}
