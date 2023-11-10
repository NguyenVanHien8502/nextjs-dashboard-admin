"use client";
import { getStogare } from "@/app/helper/stogare";
import MovieTable from "@/components/table/movie.table";
import { getAllMovies } from "@/redux/features/movie/movieService";
import {
  getAllMoviesError,
  getAllMoviesStart,
  getAllMoviesSuccess,
} from "@/redux/features/movie/movieSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

interface IProps {
  sorts: {};
  itemsPerPage: number;
  currentPage: number;
  allMovies: IMovie[] | null;
}

function Movie(props: IProps) {
  let token: string = "";
  const currentUserString = getStogare("currentUser")?.trim();
  if (currentUserString) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

  const router = useRouter();
  const dispatch = useAppDispatch();

  const sortsRedux: {} = props?.sorts;
  const currentPageRedux: number = props?.currentPage;
  const itemsPerPageRedux: number = props?.itemsPerPage;
  const movies: IMovie[] | null = props?.allMovies;

  const [currentPage, setCurrentPage] = useState<number>(currentPageRedux);
  const [itemsPerPage, setItemsPerPage] = useState<number>(itemsPerPageRedux);
  const [sorts, setSorts] = useState<{}>(sortsRedux);

  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);
    dispatch(getAllMoviesStart());
    try {
      const response = await getAllMovies(
        token,
        sorts,
        currentPage,
        itemsPerPage
      );

      if (response?.status === true) {
        dispatch(getAllMoviesSuccess(response));
      }
    } catch (error) {
      dispatch(getAllMoviesError());
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!token) {
      router.replace("/");
      toast.warning("JWT has expired. Please log in again.");
      return;
    }
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          sortsRedux={sortsRedux}
        />
      </Box>
    </>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    sorts: state?.movieReducer?.getAllMovies?.sorts,
    itemsPerPage: state?.movieReducer?.getAllMovies?.itemsPerPage,
    currentPage: state?.movieReducer?.getAllMovies?.currentPage,
    allMovies: state?.movieReducer?.getAllMovies?.allMovies,
  };
};

export default connect(mapStateToProps)(Movie);
