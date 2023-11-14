"use client";
import { getStogare } from "@/app/helper/stogare";
import CategoryTable from "@/components/table/category.table";
import { getAllCategories } from "@/redux/features/category/categoryService";
import {
  getAllCategoriesError,
  getAllCategoriesStart,
  getAllCategoriesSuccess,
} from "@/redux/features/category/categorySlice";
import { RootState, useAppDispatch } from "@/redux/store";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

interface IProps {
  sortsSelector: string;
  sortsDirection: string;
  itemsPerPage: number;
  currentPage: number;
  allCategories: ICategory[] | null;
}

function Category(props: IProps) {
  let token: string = "";
  const currentUserString = getStogare("currentUser")?.trim();
  if (currentUserString) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

  const router = useRouter();
  const dispatch = useAppDispatch();

  const sortsSelectorRedux: string = props?.sortsSelector;
  const sortsDirectionRedux: string = props?.sortsDirection;
  const currentPageRedux: number = props?.currentPage;
  const itemsPerPageRedux: number = props?.itemsPerPage;
  const categories: ICategory[] | null = props?.allCategories;

  const [currentPage, setCurrentPage] = useState<number>(currentPageRedux);
  const [itemsPerPage, setItemsPerPage] = useState<number>(itemsPerPageRedux);
  const sortsRedux: Object = { sortsSelectorRedux, sortsDirectionRedux };

  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    dispatch(getAllCategoriesStart());
    try {
      const response = await getAllCategories(token, currentPage, itemsPerPage);

      if (response?.status === true) {
        dispatch(getAllCategoriesSuccess(response));
      }
    } catch (error) {
      dispatch(getAllCategoriesError());
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!token) {
      router.replace("/");
      toast.warning("JWT has expired. Please log in again.");
      return;
    }
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage, token, router]);
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
          sortsRedux={sortsRedux}
        />
      </Box>
    </>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    sortsSelector: state?.categoryReducer?.getSortsCategory?.selector,
    sortsDirection: state?.categoryReducer?.getSortsCategory?.direction,
    itemsPerPage: state?.categoryReducer?.getAllCategories?.itemsPerPage,
    currentPage: state?.categoryReducer?.getAllCategories?.currentPage,
    allCategories: state?.categoryReducer?.getAllCategories?.allCategories,
  };
};

export default connect(mapStateToProps)(Category);
