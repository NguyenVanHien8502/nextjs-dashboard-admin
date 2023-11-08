"use client";
import { getStogare } from "@/app/helper/stogare";
import MovieTable from "@/components/table/movie.table";
import Box from "@mui/material/Box";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Movie() {
  let token: string | null = null;
  const currentUserString = getStogare("currentUser")?.trim();
  if (currentUserString) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [sorts, setSorts] = useState({});
  const [loading, setLoading] = useState(false);

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (token) {
      const fetchMovies = async () => {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.BASE_URL}/movie?${sorts}&page=${currentPage}&limit=${itemsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMovies(data?.data);
        setLoading(false);
      };
      fetchMovies();
    } else {
      router.replace("/");
      toast.error("JWT has expired. Please login again to use service");
    }
  }, [sorts, currentPage, itemsPerPage, token, router]);
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
