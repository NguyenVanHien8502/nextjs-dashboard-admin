"use client";
import UserTable from "@/components/table/user.table";
import Box from "@mui/material/Box";
import axios from "axios";
import { useEffect, useState } from "react";

export default function User() {
  let token: string | null = null;
  if (typeof localStorage !== undefined) {
    const currentUserString = localStorage.getItem("currentUser");
    if (currentUserString !== null) {
      const currentUser = JSON.parse(currentUserString);
      token = currentUser?.token;
    }
  } else {
    console.error("error: localStorage is undefined");
  }

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [sorts, setSorts] = useState({});
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.BASE_URL}/user?${sorts}&page=${currentPage}&limit=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(data?.data);
      setLoading(false);
    };
    fetchUsers();
  }, [sorts, currentPage, itemsPerPage, token]);

  return (
    <>
      <Box height={100} width={1000}>
        <UserTable
          loading={loading}
          setLoading={setLoading}
          users={users ?? []}
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
