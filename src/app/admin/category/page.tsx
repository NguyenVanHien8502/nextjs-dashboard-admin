"use client";
import CategoryTable from "@/components/table/category.table";
import Box from "@mui/material/Box";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Category() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [sorts, setSorts] = useState({});
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.BASE_URL}/category?${sorts}&page=${currentPage}&limit=${itemsPerPage}`
      );
      setCategories(data?.data);
      setLoading(false);
    };
    fetchCategories();
  }, [sorts, currentPage, itemsPerPage]);
  return (
    <>
      <Box height={100} width={1000}>
        <CategoryTable
          loading={loading}
          setLoading={setLoading}
          categories={categories ?? []}
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
